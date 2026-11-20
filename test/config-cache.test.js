import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { loadConfig } from "../src/utils";

import {
  compile,
  getCodeFromBundle,
  getCompiler,
  getErrors,
  getWarnings,
} from "./helpers/index";

const pluginPath = path.resolve(__dirname, "fixtures/config-cache/plugin.js");
const countingPluginPath = path.resolve(
  __dirname,
  "fixtures/config-cache/counting-plugin.js",
);
const mapLoaderPath = path.resolve(
  __dirname,
  "fixtures/config-cache/map-loader.js",
);
const folders = ["a", "a/b", "a/b/c", "d", "d/e"];
const directories = [];

function createProject(files) {
  // Use the real path, as webpack resolves symlinks and short (8.3) names
  const directory = fs.realpathSync.native(
    fs.mkdtempSync(path.join(os.tmpdir(), "postcss-loader-config-cache-")),
  );

  directories.push(directory);

  for (const [name, content] of Object.entries(files)) {
    const file = path.join(directory, name);

    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, content);
  }

  return directory;
}

function getCssFiles(count) {
  const files = {};
  const imports = [];

  for (let i = 0; i < count; i++) {
    const name = `src/${folders[i % folders.length]}/file-${i}.css`;

    files[name] = `.file-${i} { color: red; }\n`;
    imports.push(`import "./${name}";\n`);
  }

  files["index.js"] = imports.join("");

  return files;
}

function getJsonConfig(label) {
  return JSON.stringify({ plugins: { [pluginPath]: { label } } });
}

// Compile with the project as the context, so module ids are relative to it.
// Otherwise they are absolute paths on Windows, where the temporary directory
// can be on another drive than the fixtures.
function getProjectCompiler(directory, loaderOptions = {}, config = {}) {
  return getCompiler(path.join(directory, "index.js"), loaderOptions, {
    context: directory,
    ...config,
  });
}

function getCss(stats, count) {
  const result = [];

  for (let i = 0; i < count; i++) {
    result.push(getCodeFromBundle(`/file-${i}.css`, stats).css);
  }

  return result;
}

function createLoaderContext(directory, compilation) {
  return {
    fs,
    resourcePath: path.join(directory, "style.css"),
    addBuildDependency: jest.fn(),
    addDependency: jest.fn(),
    _compilation: compilation,
  };
}

describe("config cache", () => {
  beforeEach(() => {
    globalThis.configCachePluginCount = 0;
  });

  afterAll(() => {
    for (const directory of directories) {
      fs.rmSync(directory, { recursive: true, force: true });
    }
  });

  it("should apply the config of each directory to its files", async () => {
    const count = 10;
    const directory = createProject({
      ...getCssFiles(count),
      "src/a/.postcssrc.json": getJsonConfig("a"),
      "src/d/.postcssrc.json": getJsonConfig("d"),
    });
    const stats = await compile(getProjectCompiler(directory));
    const css = getCss(stats, count);

    for (let i = 0; i < count; i++) {
      const [label] = folders[i % folders.length].split("/");

      expect(css[i]).toContain(`config: ${label}`);
    }

    expect(getWarnings(stats)).toEqual([]);
    expect(getErrors(stats)).toEqual([]);
  });

  it("should call a function config for every file with the API of that file", async () => {
    const count = 5;
    const directory = createProject({
      ...getCssFiles(count),
      "postcss.config.js": `const path = require("path");
const plugin = require(${JSON.stringify(pluginPath)});

module.exports = (api) => ({
  plugins: [plugin({ label: path.basename(api.file) })],
});
`,
    });
    const stats = await compile(getProjectCompiler(directory));
    const css = getCss(stats, count);

    for (let i = 0; i < count; i++) {
      expect(css[i]).toContain(`config: file-${i}.css`);
    }

    expect(getErrors(stats)).toEqual([]);
  });

  it("should load the changed config in the next compilation", async () => {
    const count = 5;
    const directory = createProject({
      ...getCssFiles(count),
      ".postcssrc.json": getJsonConfig("first"),
    });
    const compiler = getProjectCompiler(directory, {}, { cache: false });

    await compile(compiler);

    fs.writeFileSync(
      path.join(directory, ".postcssrc.json"),
      getJsonConfig("second"),
    );

    const stats = await compile(compiler);

    for (const css of getCss(stats, count)) {
      expect(css).toContain("config: second");
    }

    expect(getErrors(stats)).toEqual([]);
  });

  it("should not pass the source map of one file to other files", async () => {
    const count = 5;
    const directory = createProject({
      ...getCssFiles(count),
      "postcss.config.js": `const plugin = require(${JSON.stringify(pluginPath)});

module.exports = {
  map: { inline: false, annotation: false },
  plugins: [plugin({ label: "map" })],
};
`,
    });
    const compiler = getProjectCompiler(
      directory,
      {},
      {
        // Build one module at a time, so `file-0.css` comes before the others
        parallelism: 1,
        module: {
          rules: [
            {
              test: /\.css$/i,
              use: [
                require.resolve("./helpers/testLoader"),
                {
                  loader: path.resolve(__dirname, "../src"),
                  options: { sourceMap: false },
                },
                mapLoaderPath,
              ],
            },
          ],
        },
      },
    );
    const stats = await compile(compiler);
    const css = getCss(stats, count);

    expect(css[0]).toContain("prev map: true");

    for (const item of css.slice(1)) {
      expect(item).toContain("prev map: false");
    }

    expect(getErrors(stats)).toEqual([]);
  });

  it("should load the config once per compilation object", async () => {
    const directory = createProject({
      ".postcssrc.json": getJsonConfig("first"),
    });
    const configPath = path.join(directory, ".postcssrc.json");
    const compilation = {};
    const contexts = [
      createLoaderContext(directory, compilation),
      createLoaderContext(directory, compilation),
    ];
    const first = await loadConfig(contexts[0], true);

    fs.writeFileSync(configPath, getJsonConfig("second"));

    const second = await loadConfig(contexts[1], true);

    expect(second.config).toBe(first.config);

    for (const context of contexts) {
      expect(context.addDependency).toHaveBeenCalledWith(configPath);
      expect(context.addBuildDependency).toHaveBeenCalledWith(configPath);
    }

    for (const context of [
      createLoaderContext(directory, {}),
      createLoaderContext(directory),
    ]) {
      const { config } = await loadConfig(context, true);

      expect(config.plugins[pluginPath].label).toBe("second");
    }
  });

  it("should create plugins of an object config once per compilation", async () => {
    const count = 5;
    const directory = createProject({
      ...getCssFiles(count),
      "postcss.config.js": `module.exports = {
  plugins: {
    ${JSON.stringify(countingPluginPath)}: { label: "config" },
  },
};
`,
    });
    const compiler = getProjectCompiler(directory, {}, { cache: false });
    let stats = await compile(compiler);

    for (const css of getCss(stats, count)) {
      expect(css).toContain("counting: config");
    }

    expect(globalThis.configCachePluginCount).toBe(1);

    stats = await compile(compiler);

    expect(globalThis.configCachePluginCount).toBe(2);
    expect(getErrors(stats)).toEqual([]);
  });

  it("should create plugins of the loader options once per compilation", async () => {
    const count = 5;
    const directory = createProject(getCssFiles(count));
    const stats = await compile(
      getProjectCompiler(directory, {
        postcssOptions: {
          config: false,
          plugins: [[countingPluginPath, { label: "options" }]],
        },
      }),
    );

    for (const css of getCss(stats, count)) {
      expect(css).toContain("counting: options");
    }

    expect(globalThis.configCachePluginCount).toBe(1);
    expect(getErrors(stats)).toEqual([]);
  });

  it("should create plugins of a function config for every file", async () => {
    const count = 5;
    const directory = createProject({
      ...getCssFiles(count),
      "postcss.config.js": `module.exports = () => ({
  plugins: [[${JSON.stringify(countingPluginPath)}, { label: "function" }]],
});
`,
    });
    const stats = await compile(getProjectCompiler(directory));

    for (const css of getCss(stats, count)) {
      expect(css).toContain("counting: function");
    }

    expect(globalThis.configCachePluginCount).toBe(count);
    expect(getErrors(stats)).toEqual([]);
  });

  it("should create plugins of function loader options for every file", async () => {
    const count = 5;
    const directory = createProject(getCssFiles(count));
    const stats = await compile(
      getProjectCompiler(directory, {
        postcssOptions: (loaderContext) => ({
          config: false,
          plugins: [
            [
              countingPluginPath,
              { label: path.basename(loaderContext.resourcePath) },
            ],
          ],
        }),
      }),
    );
    const css = getCss(stats, count);

    for (let i = 0; i < count; i++) {
      expect(css[i]).toContain(`counting: file-${i}.css`);
    }

    expect(globalThis.configCachePluginCount).toBe(count);
    expect(getErrors(stats)).toEqual([]);
  });

  it("should use the plugins of a function config that returns the same object", async () => {
    const count = 5;
    const directory = createProject({
      ...getCssFiles(count),
      "postcss.config.js": `const path = require("path");
const config = {};

module.exports = (api) => {
  config.plugins = [
    [${JSON.stringify(countingPluginPath)}, { label: path.basename(api.file) }],
  ];

  return config;
};
`,
    });
    const stats = await compile(getProjectCompiler(directory));
    const css = getCss(stats, count);

    for (let i = 0; i < count; i++) {
      expect(css[i]).toContain(`counting: file-${i}.css`);
    }

    expect(globalThis.configCachePluginCount).toBe(count);
    expect(getErrors(stats)).toEqual([]);
  });

  it("should use the plugins of function loader options that return the same object", async () => {
    const count = 5;
    const directory = createProject(getCssFiles(count));
    const postcssOptions = { config: false };
    const stats = await compile(
      getProjectCompiler(directory, {
        postcssOptions: (loaderContext) => {
          postcssOptions.plugins = [
            [
              countingPluginPath,
              { label: path.basename(loaderContext.resourcePath) },
            ],
          ];

          return postcssOptions;
        },
      }),
    );
    const css = getCss(stats, count);

    for (let i = 0; i < count; i++) {
      expect(css[i]).toContain(`counting: file-${i}.css`);
    }

    expect(globalThis.configCachePluginCount).toBe(count);
    expect(getErrors(stats)).toEqual([]);
  });

  it("should create one processor per compilation for the same plugins", async () => {
    const count = 5;
    const directory = createProject({
      ...getCssFiles(count),
      ".postcssrc.json": getJsonConfig("processor"),
    });

    const postcss = require("postcss");

    const spy = jest.fn((...args) => postcss(...args));
    // A plain function, the schema does not accept a `jest.fn()`
    const implementation = (...args) => spy(...args);
    const compiler = getProjectCompiler(
      directory,
      { implementation },
      { cache: false },
    );

    let stats = await compile(compiler);

    for (const css of getCss(stats, count)) {
      expect(css).toContain("config: processor");
    }

    expect(spy).toHaveBeenCalledTimes(1);

    stats = await compile(compiler);

    expect(spy).toHaveBeenCalledTimes(2);
    expect(getErrors(stats)).toEqual([]);
  });

  it("should report a plugin that fails to load for every file", async () => {
    const count = 3;
    const directory = createProject({
      ...getCssFiles(count),
      ".postcssrc.json": JSON.stringify({
        plugins: { "postcss-loader-unknown-plugin": {} },
      }),
    });
    const stats = await compile(getProjectCompiler(directory));
    const errors = stats.compilation.errors.map((error) => error.message);

    expect(errors).toHaveLength(count);

    for (let i = 0; i < count; i++) {
      expect(
        errors.some(
          (message) =>
            message.includes(
              'Loading PostCSS "postcss-loader-unknown-plugin" plugin failed',
            ) && message.includes(`file-${i}.css`),
        ),
      ).toBe(true);
    }
  });
});
