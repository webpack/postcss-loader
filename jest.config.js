/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testTimeout: 10000,
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/src/options\\.check\\.js$",
  ],
  transform: {
    "\\.[mc]?tsx?$": ["ts-jest", { rootDir: ".", esModuleInterop: true }],
    "\\.[mc]?jsx?$": "babel-jest",
  },
  // ignore node_modules except for strip-ansi and ansi-regex
  transformIgnorePatterns: ["node_modules/(?!strip-ansi|ansi-regex)"],
};
