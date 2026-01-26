/**
 * @jest-environment node
 */

import fs from "node:fs";
import path from "node:path";

import {
  compile,
  getCodeFromBundle,
  getCompiler,
  getErrors,
  getWarnings,
} from "./helpers";

describe('"sourceMap" option', () => {
  it('should generate source maps with "true" value and the "devtool" with "false" value', async () => {
    const compiler = getCompiler(
      "./css/index.js",
      {
        sourceMap: true,
        postcssOptions: { hideNothingWarning: true },
      },
      {
        devtool: false,
      },
    );
    const stats = await compile(compiler);
    const { css, sourceMap } = getCodeFromBundle("style.css", stats);

    sourceMap.sourceRoot = "";
    sourceMap.sources = sourceMap.sources.map((source) => {
      expect(path.isAbsolute(source)).toBe(true);
      expect(source).toBe(path.normalize(source));
      expect(fs.existsSync(path.resolve(sourceMap.sourceRoot, source))).toBe(
        true,
      );

      return path
        .relative(path.resolve(__dirname, "./fixtures"), source)
        .replaceAll("\\", "/");
    });

    expect(css).toMatchSnapshot("css");
    expect(sourceMap).toMatchSnapshot("source map");
    expect(getWarnings(stats)).toMatchSnapshot("warnings");
    expect(getErrors(stats)).toMatchSnapshot("errors");
  });

  it('should generate source maps with "true" value and the "devtool" option with "source-map" value', async () => {
    const compiler = getCompiler(
      "./css/index.js",
      {
        sourceMap: true,
        postcssOptions: { hideNothingWarning: true },
      },
      {
        devtool: "source-map",
      },
    );
    const stats = await compile(compiler);
    const { css, sourceMap } = getCodeFromBundle("style.css", stats);

    sourceMap.sourceRoot = "";
    sourceMap.sources = sourceMap.sources.map((source) => {
      expect(path.isAbsolute(source)).toBe(true);
      expect(source).toBe(path.normalize(source));
      expect(fs.existsSync(path.resolve(sourceMap.sourceRoot, source))).toBe(
        true,
      );

      return path
        .relative(path.resolve(__dirname, "./fixtures"), source)
        .replaceAll("\\", "/");
    });

    expect(css).toMatchSnapshot("css");
    expect(sourceMap).toMatchSnapshot("source map");
    expect(getWarnings(stats)).toMatchSnapshot("warnings");
    expect(getErrors(stats)).toMatchSnapshot("errors");
  });

  it('should generate source maps when value is not specified and the "devtool" with "source-map" value', async () => {
    const compiler = getCompiler(
      "./css/index.js",
      {
        postcssOptions: { hideNothingWarning: true },
      },
      {
        devtool: "source-map",
      },
    );
    const stats = await compile(compiler);
    const { css, sourceMap } = getCodeFromBundle("style.css", stats);

    sourceMap.sourceRoot = "";
    sourceMap.sources = sourceMap.sources.map((source) => {
      expect(path.isAbsolute(source)).toBe(true);
      expect(source).toBe(path.normalize(source));
      expect(fs.existsSync(path.resolve(sourceMap.sourceRoot, source))).toBe(
        true,
      );

      return path
        .relative(path.resolve(__dirname, "./fixtures"), source)
        .replaceAll("\\", "/");
    });

    expect(css).toMatchSnapshot("css");
    expect(sourceMap).toMatchSnapshot("source map");
    expect(getWarnings(stats)).toMatchSnapshot("warnings");
    expect(getErrors(stats)).toMatchSnapshot("errors");
  });

  it('should generate source maps with "false" value, but the "postcssOptions.map" has values', async () => {
    const compiler = getCompiler(
      "./css/index.js",
      {
        postcssOptions: {
          map: {
            inline: false,
            annotation: false,
            prev: false,
            sourcesContent: true,
          },
          hideNothingWarning: true,
        },
      },
      {
        devtool: false,
      },
    );
    const stats = await compile(compiler);
    const { css, sourceMap } = getCodeFromBundle("style.css", stats);

    sourceMap.sourceRoot = "";
    sourceMap.sources = sourceMap.sources.map((source) => {
      expect(path.isAbsolute(source)).toBe(false);
      expect(source).toBe(path.normalize(source));
      expect(
        fs.existsSync(path.resolve(__dirname, "./fixtures/css", source)),
      ).toBe(true);

      return source.replaceAll("\\", "/");
    });

    expect(css).toMatchSnapshot("css");
    expect(sourceMap).toMatchSnapshot("source map");
    expect(getWarnings(stats)).toMatchSnapshot("warnings");
    expect(getErrors(stats)).toMatchSnapshot("errors");
  });

  it('should generate source maps using the "postcssOptions.map" option with "true" value and previous loader returns source maps ("sass-loader")', async () => {
    const compiler = getCompiler(
      "./scss/index.js",
      {},
      {
        devtool: false,
        module: {
          rules: [
            {
              test: /\.scss$/i,
              use: [
                {
                  loader: require.resolve("./helpers/testLoader"),
                  options: {},
                },
                {
                  loader: path.resolve(__dirname, "../src"),
                  options: {
                    postcssOptions: {
                      map: true,
                      hideNothingWarning: true,
                    },
                  },
                },
                {
                  loader: "sass-loader",
                  options: {
                    implementation: require("sass"),
                    sassOptions: {
                      sourceMap: true,
                      sourceMapRoot: path.resolve(
                        __dirname,
                        "./fixtures/scss/",
                      ),
                      outFile: path.resolve(
                        __dirname,
                        "./fixtures/scss/style.css.map",
                      ),
                      sourceMapContents: true,
                      omitSourceMapUrl: true,
                      sourceMapEmbed: false,
                    },
                  },
                },
              ],
            },
          ],
        },
      },
    );
    const stats = await compile(compiler);
    const { css, sourceMap } = getCodeFromBundle("style.scss", stats);

    expect(css).toMatchSnapshot("css");
    expect(sourceMap).toBeUndefined();
    expect(getWarnings(stats)).toMatchSnapshot("warnings");
    expect(getErrors(stats)).toMatchSnapshot("errors");
  });

  it('should generate source maps using the "postcssOptions.map" option with values and previous loader returns source maps ("sass-loader")', async () => {
    const compiler = getCompiler(
      "./scss/index.js",
      {},
      {
        devtool: false,
        module: {
          rules: [
            {
              test: /\.scss$/i,
              use: [
                {
                  loader: require.resolve("./helpers/testLoader"),
                  options: {},
                },
                {
                  loader: path.resolve(__dirname, "../src"),
                  options: {
                    postcssOptions: {
                      map: {
                        inline: false,
                        sourcesContent: true,
                        annotation: true,
                      },
                      hideNothingWarning: true,
                    },
                  },
                },
                {
                  loader: "sass-loader",
                  options: {
                    implementation: require("sass"),
                    sassOptions: {
                      sourceMap: true,
                      sourceMapRoot: path.resolve(
                        __dirname,
                        "./fixtures/scss/",
                      ),
                      outFile: path.resolve(
                        __dirname,
                        "./fixtures/scss/style.css.map",
                      ),
                      sourceMapContents: true,
                      omitSourceMapUrl: true,
                      sourceMapEmbed: false,
                    },
                  },
                },
              ],
            },
          ],
        },
      },
    );
    const stats = await compile(compiler);
    const { css, sourceMap } = getCodeFromBundle("style.scss", stats);

    sourceMap.sourceRoot = "";
    sourceMap.sources = sourceMap.sources.map((source) => {
      expect(path.isAbsolute(source)).toBe(false);
      expect(
        fs.existsSync(path.resolve(__dirname, "./fixtures/scss", source)),
      ).toBe(true);

      return source.replaceAll("\\", "/");
    });

    expect(css).toMatchSnapshot("css");
    expect(sourceMap).toMatchSnapshot("source map");
    expect(getWarnings(stats)).toMatchSnapshot("warnings");
    expect(getErrors(stats)).toMatchSnapshot("errors");
  });

  it('should not generate source maps with "false" value and the "devtool" option with "false" value', async () => {
    const compiler = getCompiler(
      "./css/index.js",
      {
        sourceMap: false,
        postcssOptions: { hideNothingWarning: true },
      },
      {
        devtool: false,
      },
    );
    const stats = await compile(compiler);
    const { css, sourceMap } = getCodeFromBundle("style.css", stats);

    expect(css).toMatchSnapshot("css");
    expect(sourceMap).toBeUndefined();
    expect(getWarnings(stats)).toMatchSnapshot("warnings");
    expect(getErrors(stats)).toMatchSnapshot("errors");
  });

  it('should not generate source maps with "false" value and the "devtool" option with "source-map" value', async () => {
    const compiler = getCompiler(
      "./css/index.js",
      {
        sourceMap: false,
        postcssOptions: { hideNothingWarning: true },
      },
      {
        devtool: "source-map",
      },
    );
    const stats = await compile(compiler);
    const { css, sourceMap } = getCodeFromBundle("style.css", stats);

    expect(css).toMatchSnapshot("css");
    expect(sourceMap).toBeUndefined();
    expect(getWarnings(stats)).toMatchSnapshot("warnings");
    expect(getErrors(stats)).toMatchSnapshot("errors");
  });

  it('should not generate source maps when value is not specified and the "devtool" option with "source-map" value', async () => {
    const compiler = getCompiler(
      "./css/index.js",
      {
        postcssOptions: { hideNothingWarning: true },
      },
      {
        devtool: false,
      },
    );
    const stats = await compile(compiler);
    const { css, sourceMap } = getCodeFromBundle("style.css", stats);

    expect(css).toMatchSnapshot("css");
    expect(sourceMap).toBeUndefined();
    expect(getWarnings(stats)).toMatchSnapshot("warnings");
    expect(getErrors(stats)).toMatchSnapshot("errors");
  });

  it('should generate source maps when previous loader returns source maps ("sass-loader")', async () => {
    const compiler = getCompiler(
      "./scss/index.js",
      {},
      {
        devtool: "source-map",
        module: {
          rules: [
            {
              test: /\.scss$/i,
              use: [
                {
                  loader: require.resolve("./helpers/testLoader"),
                },
                {
                  loader: path.resolve(__dirname, "../src"),
                  options: {
                    postcssOptions: { hideNothingWarning: true },
                  },
                },
                {
                  loader: "sass-loader",
                  options: {
                    implementation: require("sass"),
                  },
                },
              ],
            },
          ],
        },
      },
    );
    const stats = await compile(compiler);
    const { css, sourceMap } = getCodeFromBundle("style.scss", stats);

    sourceMap.sourceRoot = "";
    sourceMap.sources = sourceMap.sources.map((source) => {
      expect(path.isAbsolute(source)).toBe(true);
      expect(source).toBe(path.normalize(source));
      expect(fs.existsSync(path.resolve(sourceMap.sourceRoot, source))).toBe(
        true,
      );

      return path
        .relative(path.resolve(__dirname, "./fixtures"), source)
        .replaceAll("\\", "/");
    });

    expect(css).toMatchSnapshot("css");
    expect(sourceMap).toMatchSnapshot("source map");
    expect(getWarnings(stats)).toMatchSnapshot("warnings");
    expect(getErrors(stats)).toMatchSnapshot("errors");
  });

  it('should generate source maps when previous loader returns source maps ("less-loader")', async () => {
    const compiler = getCompiler(
      "./less/index.js",
      {},
      {
        devtool: "source-map",
        module: {
          rules: [
            {
              test: /\.less$/i,
              use: [
                {
                  loader: require.resolve("./helpers/testLoader"),
                  options: {},
                },
                {
                  loader: path.resolve(__dirname, "../src"),
                  options: {
                    postcssOptions: { hideNothingWarning: true },
                  },
                },
                {
                  loader: "less-loader",
                },
              ],
            },
          ],
        },
      },
    );
    const stats = await compile(compiler);
    const { css, sourceMap } = getCodeFromBundle("style.less", stats);

    sourceMap.sourceRoot = "";
    sourceMap.sources = sourceMap.sources.map((source) => {
      expect(path.isAbsolute(source)).toBe(true);
      expect(source).toBe(path.normalize(source));
      expect(
        fs.existsSync(
          path.resolve(__dirname, "./fixtures/less", path.basename(source)),
        ),
      ).toBe(true);

      return path
        .relative(path.resolve(__dirname, "./fixtures"), source)
        .replaceAll("\\", "/");
    });

    expect(css).toMatchSnapshot("css");
    expect(sourceMap).toMatchSnapshot("source map");
    expect(getWarnings(stats)).toMatchSnapshot("warnings");
    expect(getErrors(stats)).toMatchSnapshot("errors");
  });

  it('should generate inline source maps when the "devtool" is "false"', async () => {
    const compiler = getCompiler(
      "./css/index.js",
      {
        postcssOptions: {
          map: {
            inline: true,
            annotation: false,
          },
          hideNothingWarning: true,
        },
      },
      {
        devtool: false,
      },
    );
    const stats = await compile(compiler);
    const { css } = getCodeFromBundle("style.css", stats);

    expect(css).toMatchSnapshot("css");
    expect(getWarnings(stats)).toMatchSnapshot("warnings");
    expect(getErrors(stats)).toMatchSnapshot("errors");
  });

  it('should generate inline source maps when the "devtool" is "true"', async () => {
    const compiler = getCompiler(
      "./css/index.js",
      {
        postcssOptions: {
          map: {
            inline: true,
            annotation: false,
          },
          hideNothingWarning: true,
        },
      },
      {
        devtool: "source-map",
      },
    );
    const stats = await compile(compiler);
    const { css } = getCodeFromBundle("style.css", stats);

    expect(css).toMatchSnapshot("css");
    expect(getWarnings(stats)).toMatchSnapshot("warnings");
    expect(getErrors(stats)).toMatchSnapshot("errors");
  });
});
