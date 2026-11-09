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
const mapLoaderPath = path.resolve(
  __dirname,
  "fixtures/config-cache/map-loader.js",
);
const folders = ["a", "a/b", "a/b/c", "d", "d/e"];
const directories = [];

function createProject(files) {
  const directory = fs.mkdtempSync(
    path.join(os.tmpdir(), "postcss-loader-config-cache-"),
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
    const stats = await compile(getCompiler(path.join(directory, "index.js")));
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
    const stats = await compile(getCompiler(path.join(directory, "index.js")));
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
    const compiler = getCompiler(
      path.join(directory, "index.js"),
      {},
      { cache: false },
    );

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
    const compiler = getCompiler(
      path.join(directory, "index.js"),
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
});
