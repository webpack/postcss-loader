import path from "node:path";

import { Volume, createFsFromVolume } from "memfs";
import webpack from "webpack";

// Compiles a fixture using the built-in CSS support of webpack
// (i.e. `experiments.css` and the `css/auto` module type), so no
// `css-loader`/`style-loader` are involved.
export default (fixture, loaderOptions = {}, config = {}) => {
  const fullConfig = {
    mode: "development",
    devtool: config.devtool || false,
    context: path.resolve(__dirname, "../fixtures"),
    entry: path.resolve(__dirname, "../fixtures", fixture),
    experiments: {
      css: true,
    },
    output: {
      path: path.resolve(__dirname, "../outputs"),
      filename: "[name].bundle.js",
      chunkFilename: "[name].chunk.js",
      cssFilename: "[name].css",
      cssChunkFilename: "[name].chunk.css",
      publicPath: "/webpack/public/path/",
    },
    module: {
      rules: [
        {
          test: /\.(css|sss)$/i,
          type: "css/auto",
          use: [
            {
              loader: path.resolve(__dirname, "../../src"),
              options: loaderOptions || {},
            },
          ],
        },
      ],
    },
    plugins: [],
    ...config,
  };

  const compiler = webpack(fullConfig);

  if (!config.outputFileSystem) {
    const outputFileSystem = createFsFromVolume(new Volume());

    outputFileSystem.join = path.join.bind(path);

    compiler.outputFileSystem = outputFileSystem;
  }

  return compiler;
};
