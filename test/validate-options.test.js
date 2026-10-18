import path from "node:path";

import { validate } from "schema-utils";

import check from "../src/options.check";
import schema from "../src/options.json";

import { compile, getCompiler } from "./helpers/index";

/**
 * @param {object} options loader options
 * @returns {boolean} whether the schema accepts them
 */
function isValid(options) {
  try {
    validate(schema, options);

    return true;
  } catch {
    return false;
  }
}

describe("validate options", () => {
  const tests = {
    execute: {
      success: [false],
      failure: [1, "test", /test/, [], {}, { foo: "bar" }],
    },
    postcssOptions: {
      success: [
        { parser: "sugarss" },
        { parser: require("sugarss") },
        { parser: require("sugarss").parse },
        { syntax: "sugarss" },
        { syntax: require("sugarss") },
        { stringifier: "sugarss" },
        { stringifier: require("sugarss") },
        { stringifier: require("sugarss").stringify },
        {
          plugins: [
            require("./fixtures/plugin/plugin")(),
            require("./fixtures/plugin/plugin"),
            ["postcss-short", { prefix: "x" }],
          ],
        },
        {
          plugins: [
            require("./fixtures/plugin/plugin")(),
            require("./fixtures/plugin/plugin"),
            { "postcss-short": { prefix: "x" } },
          ],
        },
        { plugins: { "postcss-short": { prefix: "x" } } },
        { config: true },
        { config: false },
        { config: "test/fixtures/config-scope/config/postcss.config.js" },
        {
          config: path.resolve(
            __dirname,
            "./fixtures/config-scope/config/postcss.config.js",
          ),
        },
      ],
      failure: [{ config: [] }, { config: /test/ }],
    },
    sourceMap: {
      success: [true, false],
      failure: [1, /test/, [], {}, "something"],
    },
    implementation: {
      success: [require("postcss"), "postcss"],
      failure: [1, /test/, [], {}],
    },
  };

  function stringifyValue(value) {
    if (
      Array.isArray(value) ||
      (value && typeof value === "object" && value.constructor === Object)
    ) {
      return JSON.stringify(value);
    }

    return value;
  }

  async function createTestCase(key, value, type) {
    it(`should ${
      type === "success" ? "successfully validate" : "throw an error on"
    } the "${key}" option with "${stringifyValue(value)}" value`, async () => {
      // webpack trusts a check that passes and skips the schema, so the two
      // must agree on every value
      expect(check({ [key]: value })).toBe(isValid({ [key]: value }));

      let compiler;

      if (
        key === "postcssOptions" &&
        // eslint-disable-next-line no-prototype-builtins
        (value.hasOwnProperty("parser") || value.hasOwnProperty("syntax"))
      ) {
        compiler = getCompiler(
          "./sss/index.js",
          {},
          {
            module: {
              rules: [
                {
                  test: /\.sss$/i,
                  use: [
                    {
                      loader: require.resolve("./helpers/testLoader"),
                      options: {},
                    },
                    {
                      loader: path.resolve(__dirname, "../src"),
                      options: { [key]: value },
                    },
                  ],
                },
              ],
            },
          },
        );
      } else {
        compiler = getCompiler("./css/index.js", { [key]: value });
      }

      let stats;

      try {
        stats = await compile(compiler);
      } finally {
        if (type === "success") {
          expect(stats.hasErrors()).toBe(false);
        } else if (type === "failure") {
          const {
            compilation: { errors },
          } = stats;

          expect(errors).toHaveLength(1);
          expect(() => {
            throw new Error(errors[0].error.message);
          }).toThrowErrorMatchingSnapshot();
        }
      }
    });
  }

  for (const [key, values] of Object.entries(tests)) {
    for (const type of Object.keys(values)) {
      for (const value of values[type]) {
        createTestCase(key, value, type);
      }
    }
  }
});
