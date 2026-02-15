# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [8.2.1](https://github.com/webpack/postcss-loader/compare/v8.2.0...v8.2.1) (2026-02-15)


### Bug Fixes

* update peer dependency for @rspack/core v2 ([#717](https://github.com/webpack/postcss-loader/issues/717)) ([a3ed7e2](https://github.com/webpack/postcss-loader/commit/a3ed7e236b6414efdb89084fb90861a16db84b6a))

## [8.2.0](https://github.com/webpack-contrib/postcss-loader/compare/v8.1.1...v8.2.0) (2025-09-01)


### Features

* update `jiti` from v1 to v2 ([9c74974](https://github.com/webpack-contrib/postcss-loader/commit/9c749746df8ddadbac3af60387dc562242350c9a))

### [8.1.1](https://github.com/webpack-contrib/postcss-loader/compare/v8.1.0...v8.1.1) (2024-02-28)


### Bug Fixes

* respect `default` when loading postcss esm configs ([52d8050](https://github.com/webpack-contrib/postcss-loader/commit/52d8050335ca803572e9cc9eae9583c2bb505612))

## [8.1.0](https://github.com/webpack-contrib/postcss-loader/compare/v8.0.0...v8.1.0) (2024-01-30)


### Features

* add `@rspack/core` as an optional peer dependency ([#679](https://github.com/webpack-contrib/postcss-loader/issues/679)) ([512e4c3](https://github.com/webpack-contrib/postcss-loader/commit/512e4c33a6072534008c0eefc481139f58effbdf))

## [8.0.0](https://github.com/webpack-contrib/postcss-loader/compare/v7.3.4...v8.0.0) (2024-01-16)


### ⚠ BREAKING CHANGES

* minimum supported Node.js version is `18.12.0` ([#677](https://github.com/webpack-contrib/postcss-loader/issues/677)) ([8dd0315](https://github.com/webpack-contrib/postcss-loader/commit/8dd0315c03e0f608b6a9a4c6a58e9e7a64775e56))

### [7.3.4](https://github.com/webpack-contrib/postcss-loader/compare/v7.3.3...v7.3.4) (2023-12-27)


### Bug Fixes

* do not crash if pkg.(d|devD)ependencies unset ([#667](https://github.com/webpack-contrib/postcss-loader/issues/667)) ([8ef0c7e](https://github.com/webpack-contrib/postcss-loader/commit/8ef0c7e5c6c4eb76073b4ea92306fc399014e462))

### [7.3.3](https://github.com/webpack-contrib/postcss-loader/compare/v7.3.2...v7.3.3) (2023-06-10)


### Bug Fixes

* **perf:** avoid using `klona` for postcss options ([#658](https://github.com/webpack-contrib/postcss-loader/issues/658)) ([e754c3f](https://github.com/webpack-contrib/postcss-loader/commit/e754c3f8451a09ea633674af90fb3b6b1c073460))
* bug with loading configurations after updating `cosmiconfig` to version 8.2 ([684d265](https://github.com/webpack-contrib/postcss-loader/commit/684d2654393d225bbbcc443ffc9494ab54fe8112))

### [7.3.2](https://github.com/webpack-contrib/postcss-loader/compare/v7.3.1...v7.3.2) (2023-05-28)


### Bug Fixes

* use `cause` to keep original errors and warnings ([#655](https://github.com/webpack-contrib/postcss-loader/issues/655)) ([e8873f4](https://github.com/webpack-contrib/postcss-loader/commit/e8873f46b4ac3cf94d854d8c20f0d0a444309eb6))

### [7.3.1](https://github.com/webpack-contrib/postcss-loader/compare/v7.3.0...v7.3.1) (2023-05-26)


### Bug Fixes

* warning and error serialization ([65748ec](https://github.com/webpack-contrib/postcss-loader/commit/65748ece396d0b38713783495d8a64f128d3992b))

## [7.3.0](https://github.com/webpack-contrib/postcss-loader/compare/v7.2.4...v7.3.0) (2023-04-28)


### Features

* use `jiti` for typescript configurations ([#649](https://github.com/webpack-contrib/postcss-loader/issues/649)) ([8b876fa](https://github.com/webpack-contrib/postcss-loader/commit/8b876fa49c71c434b9c5598b179a4f88cf8123e4))

### [7.2.4](https://github.com/webpack-contrib/postcss-loader/compare/v7.2.3...v7.2.4) (2023-04-04)


### Bug Fixes

* memory leak ([#642](https://github.com/webpack-contrib/postcss-loader/issues/642)) ([7ab3b59](https://github.com/webpack-contrib/postcss-loader/commit/7ab3b591dd108732aeab1178d452763936105eae))

### [7.2.3](https://github.com/webpack-contrib/postcss-loader/compare/v7.2.2...v7.2.3) (2023-04-03)


### Bug Fixes

* `ts-node` loading ([#640](https://github.com/webpack-contrib/postcss-loader/issues/640)) ([38b1992](https://github.com/webpack-contrib/postcss-loader/commit/38b199285e02ec767ebebd366180b663731c38cb))

### [7.2.2](https://github.com/webpack-contrib/postcss-loader/compare/v7.2.1...v7.2.2) (2023-04-03)


### Bug Fixes

* cannot find module 'ts-node' ([#639](https://github.com/webpack-contrib/postcss-loader/issues/639)) ([ab4d16a](https://github.com/webpack-contrib/postcss-loader/commit/ab4d16a55b3539cc2b160727b426c6deef75ace9))

### [7.2.1](https://github.com/webpack-contrib/postcss-loader/compare/v7.2.0...v7.2.1) (2023-04-03)


### Bug Fixes

* cosmiconfig typescript loader ([#635](https://github.com/webpack-contrib/postcss-loader/issues/635)) ([129f5be](https://github.com/webpack-contrib/postcss-loader/commit/129f5be42ead5c5a2b0f654631bcb94fa3d76a95))

## [7.2.0](https://github.com/webpack-contrib/postcss-loader/compare/v7.1.0...v7.2.0) (2023-04-03)


### Features

* add support for TypeScript based configs ([#632](https://github.com/webpack-contrib/postcss-loader/issues/632)) ([c6b5def](https://github.com/webpack-contrib/postcss-loader/commit/c6b5def4459df0492d4d9175748823e89fa8f3ed))

## [7.1.0](https://github.com/webpack-contrib/postcss-loader/compare/v7.0.2...v7.1.0) (2023-03-16)


### Features

* **deps:** update `cosmiconfig` ([#628](https://github.com/webpack-contrib/postcss-loader/issues/628)) ([8114be4](https://github.com/webpack-contrib/postcss-loader/commit/8114be41a46843cbf614bc422e3cafcb8e853860))

### [7.0.2](https://github.com/webpack-contrib/postcss-loader/compare/v7.0.1...v7.0.2) (2022-11-29)


### Bug Fixes

* support ESM version of `postcss.config.js` and `postcss.config.mjs` ([#614](https://github.com/webpack-contrib/postcss-loader/issues/614)) ([955085f](https://github.com/webpack-contrib/postcss-loader/commit/955085f04f5d12bb89d660d88159169b80d5eb99))

### [7.0.1](https://github.com/webpack-contrib/postcss-loader/compare/v7.0.0...v7.0.1) (2022-07-11)


### Bug Fixes

* unexpected failing on CSS syntax error ([#593](https://github.com/webpack-contrib/postcss-loader/issues/593)) ([888d72e](https://github.com/webpack-contrib/postcss-loader/commit/888d72e340b6d176e95c15d5f96ca412af86a66a))

## [7.0.0](https://github.com/webpack-contrib/postcss-loader/compare/v6.2.1...v7.0.0) (2022-05-18)


### ⚠ BREAKING CHANGES

* minimum supported `Node.js` version is `14.15.0`

### [6.2.1](https://github.com/webpack-contrib/postcss-loader/compare/v6.2.0...v6.2.1) (2021-11-26)


### Bug Fixes

* watching configuration ([#553](https://github.com/webpack-contrib/postcss-loader/issues/553)) ([7f165b4](https://github.com/webpack-contrib/postcss-loader/commit/7f165b4991b59085651b517d960556a77b72a4d6))

## [6.2.0](https://github.com/webpack-contrib/postcss-loader/compare/v6.1.1...v6.2.0) (2021-10-13)


### Features

* add `link` field in schema ([#540](https://github.com/webpack-contrib/postcss-loader/issues/540)) ([1ae8212](https://github.com/webpack-contrib/postcss-loader/commit/1ae82129bce9039ac25f7254aa9ba8827ab79b3e))

### [6.1.1](https://github.com/webpack-contrib/postcss-loader/compare/v6.1.0...v6.1.1) (2021-07-01)


### Bug Fixes

* do not swallow exception from postcss ([2eec42b](https://github.com/webpack-contrib/postcss-loader/commit/2eec42b1a61bbafa039627d3071ba2a1be03de9f))

## [6.1.0](https://github.com/webpack-contrib/postcss-loader/compare/v6.0.0...v6.1.0) (2021-06-10)


### Features

* allow `String` value for the "implementation" option ([0d342b1](https://github.com/webpack-contrib/postcss-loader/commit/0d342b16dabf58c499da4e13310fdfa5c05badd9))

## [6.0.0](https://github.com/webpack-contrib/postcss-loader/compare/v5.3.0...v6.0.0) (2021-06-10)


### ⚠ BREAKING CHANGES

* minimum supported `Node.js` version is `12.13.0` (#526)

### Bug Fixes

* check postcss as project dependency ([570db67](https://github.com/webpack-contrib/postcss-loader/commit/570db6726e4f86c966bc35c13637e0aad00f7a1a))


## [5.3.0](https://github.com/webpack-contrib/postcss-loader/compare/v5.2.0...v5.3.0) (2021-05-14)


### Features

* add support for `dir-dependency` message type ([#524](https://github.com/webpack-contrib/postcss-loader/issues/524)) ([91dea60](https://github.com/webpack-contrib/postcss-loader/commit/91dea607623d3f9a2c3f7c989243934ba5274296))

## [5.2.0](https://github.com/webpack-contrib/postcss-loader/compare/v5.1.0...v5.2.0) (2021-03-11)


### Features

* support `ecma` modules for the 'parser', 'stringifier' and 'syntax' options ([#519](https://github.com/webpack-contrib/postcss-loader/issues/519)) ([cc69754](https://github.com/webpack-contrib/postcss-loader/commit/cc69754383f6f9881ac5f02ec489eb89db2cfb0d))

## [5.1.0](https://github.com/webpack-contrib/postcss-loader/compare/v5.0.0...v5.1.0) (2021-03-05)


### Features

* added support for registering `context`, `build` and `missing` dependencies ([#518](https://github.com/webpack-contrib/postcss-loader/issues/518)) ([9ce4972](https://github.com/webpack-contrib/postcss-loader/commit/9ce4972c6740c8dd82463fff0934987695ccf7d2)), please read [docs](https://github.com/webpack-contrib/postcss-loader#add-dependencies-contextdependencies-builddependencies-missingdependencies)

## [5.0.0](https://github.com/webpack-contrib/postcss-loader/compare/v4.2.0...v5.0.0) (2021-02-02)


### ⚠ BREAKING CHANGES

* minimum supported `webpack` version is `5`

## [4.2.0](https://github.com/webpack-contrib/postcss-loader/compare/v4.1.0...v4.2.0) (2021-01-21)


### Features

* added the `implementation` option ([#511](https://github.com/webpack-contrib/postcss-loader/issues/511)) ([deac978](https://github.com/webpack-contrib/postcss-loader/commit/deac9787eed614b1c445f091a2b70736a6212812))

## [4.1.0](https://github.com/webpack-contrib/postcss-loader/compare/v4.0.4...v4.1.0) (2020-11-19)


### Features

* partial compatibility with `postcss-cli`, added `api.env` (alias for `api.mode`) and `api.options` (contains options from the `postcssOptions` options), please look at the [example](https://github.com/webpack-contrib/postcss-loader#examples-of-config-files) for more details ([#498](https://github.com/webpack-contrib/postcss-loader/issues/498)) ([84a9c46](https://github.com/webpack-contrib/postcss-loader/commit/84a9c46467086df0185519ceb93bf66893af4cf2))

### [4.0.4](https://github.com/webpack-contrib/postcss-loader/compare/v4.0.3...v4.0.4) (2020-10-09)

### Chore

* update `schema-utils`

## [4.0.3](https://github.com/webpack-contrib/postcss-loader/compare/v4.0.2...v4.0.3) (2020-10-02)


### Bug Fixes

* PostCSS 8 plugin loading ([e1b82fe](https://github.com/webpack-contrib/postcss-loader/commit/e1b82feb9cc27f55953b9237708800cb8c07724e))
* error and warning messages ([#485](https://github.com/webpack-contrib/postcss-loader/issues/485)) ([4b44e01](https://github.com/webpack-contrib/postcss-loader/commit/4b44e01a323aa9d2c0965e92c1796158cb36ce5a))

### [4.0.2](https://github.com/webpack-contrib/postcss-loader/compare/v4.0.1...v4.0.2) (2020-09-15)


### Bug Fixes

* compatibility with `postcss@8` ([#479](https://github.com/webpack-contrib/postcss-loader/issues/479)) ([218b0f8](https://github.com/webpack-contrib/postcss-loader/commit/218b0f8013acfafdabea9f561d4c3d074bd2eff3))

### [4.0.1](https://github.com/webpack-contrib/postcss-loader/compare/v4.0.0...v4.0.1) (2020-09-08)


### Bug Fixes

* source map generation with the `map` option for `postcss` ([#476](https://github.com/webpack-contrib/postcss-loader/issues/476)) ([6babeb1](https://github.com/webpack-contrib/postcss-loader/commit/6babeb1d64ca1e7d3d3651cb07881e1e291fa994))

## [4.0.0](https://github.com/webpack-contrib/postcss-loader/compare/v3.0.0...v4.0.0) (2020-09-07)


### ⚠ BREAKING CHANGES

* minimum supported `Node.js` version is `10.13`
* minimum supported `webpack` version is `4`
* `postcss` was moved to `peerDependencies`, you need to install `postcss`
* `PostCSS` (`plugins`/`syntax`/`parser`/`stringifier`) options was moved to the `postcssOptions` option, please look at [docs](https://github.com/webpack-contrib/postcss-loader#postcssoptions)
* `sourceMap` default value depends on the `compiler.devtool` option
* the `inline` value was removed for the `sourceMap` option, please use `{ map: { inline: true, annotation: false } }` to achieve this
* source maps contain absolute paths in `sources`
* loader output only CSS, so you need to use `css-loader`/`file-loader`/`raw-loader` to inject code inside bundle
* `exec` option was renamed to the `execute` option
* the `config` option doesn't support `Object` type anymore, `config.path` and `config.ctx` options were removed
* argument in the config for `Function` notation (previously `config.ctx`) was changed, now it contains `{ file, mode, webpackLoaderContext }`
* loader context in the config was renamed from `webpack` to `webpackLoaderContext`

### Features

* message API for emit assets ([#443](https://github.com/webpack-contrib/postcss-loader/issues/443)) ([e966ab9](https://github.com/webpack-contrib/postcss-loader/commit/e966ab965132ca812cb50e5eaf7df5fc2ad9c137))
* reuse AST from other loaders ([#468](https://github.com/webpack-contrib/postcss-loader/issues/468)) ([9b75888](https://github.com/webpack-contrib/postcss-loader/commit/9b75888dff4957f2ef1e94eca871e329354a9f6d))
* allows to use config and loader options together, options from the loader takes precedence over the config, the `plugins` option from the config and options are merged ([0eb5aaf](https://github.com/webpack-contrib/postcss-loader/commit/0eb5aaf3d49f6d5e570a3c3fdb6b201487e503c7))
* `postcssOptions` options can be `Function`

### Bug Fixes

* compatibility with webpack@5 ([#437](https://github.com/webpack-contrib/postcss-loader/issues/437)) ([ed50491](https://github.com/webpack-contrib/postcss-loader/commit/ed504910b70b4d8b4d77084c19ad92330676433e))
* `default` export for plugins ([#465](https://github.com/webpack-contrib/postcss-loader/issues/465)) ([3d32c35](https://github.com/webpack-contrib/postcss-loader/commit/3d32c35c5c911d6bd25dc0c4b5b3cd11408632d7))
* avoid mutations of loader options and config ([#470](https://github.com/webpack-contrib/postcss-loader/issues/470)) ([cad6f07](https://github.com/webpack-contrib/postcss-loader/commit/cad6f07c7f4923e8ef69ecb402b10bbd08d09530))
* respect the `map` option from loader options and config ([#458](https://github.com/webpack-contrib/postcss-loader/issues/458)) ([98441ff](https://github.com/webpack-contrib/postcss-loader/commit/98441ff87e51b58e9322d1bebb5eefc5ba417e24))

### Notes

* you don't need `ident` option for loader
* `Object` syntax for the `plugin` option is soft deprecated, please migrate on `Array` syntax (`plugins: ['postcss-preset-env', ['cssnano', options]]`)

<a name="3.0.0"></a>
# [3.0.0](https://github.com/postcss/postcss-loader/compare/v2.1.6...v3.0.0) (2018-08-08)


### Bug Fixes

* **index:** add ast version (`meta.ast`) ([f34954f](https://github.com/postcss/postcss-loader/commit/f34954f))
* **index:** emit `warnings` as an instance of `{Error}` ([8ac6fb5](https://github.com/postcss/postcss-loader/commit/8ac6fb5))
* **options:** improved `ValidationError` messages ([549ea08](https://github.com/postcss/postcss-loader/commit/549ea08))


### Chores

* **package:** update `postcss` v6.0.0...7.0.0 (`dependencies`) ([#375](https://github.com/postcss/postcss-loader/issues/375)) ([daa0da8](https://github.com/postcss/postcss-loader/commit/daa0da8))


### BREAKING CHANGES

* **package:** requires `node >= v6.0.0`



<a name="2.1.6"></a>
## [2.1.6](https://github.com/postcss/postcss-loader/compare/v2.1.5...v2.1.6) (2018-07-10)


### Bug Fixes

* **package:** config memory leak, updates `postcss-load-config` v1.2.0...2.0.0 (`dependencies`) ([0547b12](https://github.com/postcss/postcss-loader/commit/0547b12))



<a name="2.1.5"></a>
## [2.1.5](https://github.com/postcss/postcss-loader/compare/v2.1.4...v2.1.5) (2018-05-04)


### Bug Fixes

* **index:** remove `sourceMap` warning ([#361](https://github.com/postcss/postcss-loader/issues/361)) ([4416791](https://github.com/postcss/postcss-loader/commit/4416791))



<a name="2.1.4"></a>
## [2.1.4](https://github.com/postcss/postcss-loader/compare/v2.1.3...v2.1.4) (2018-04-16)


### Bug Fixes

* restore loader object in postcss config context ([#355](https://github.com/postcss/postcss-loader/issues/355)) ([2ff1735](https://github.com/postcss/postcss-loader/commit/2ff1735))



<a name="2.1.3"></a>
## [2.1.3](https://github.com/postcss/postcss-loader/compare/v2.1.2...v2.1.3) (2018-03-20)


### Bug Fixes

* **options:** revert additionalProperties changes to keep SemVer ([bd7fc38](https://github.com/postcss/postcss-loader/commit/bd7fc38))



<a name="2.1.2"></a>
## [2.1.2](https://github.com/postcss/postcss-loader/compare/v2.1.1...v2.1.2) (2018-03-17)


### Bug Fixes

* **options:** disallow additional properties and add `ident` to validation ([#346](https://github.com/postcss/postcss-loader/issues/346)) ([82ef553](https://github.com/postcss/postcss-loader/commit/82ef553))



<a name="2.1.1"></a>
## [2.1.1](https://github.com/postcss/postcss-loader/compare/v2.1.0...v2.1.1) (2018-02-26)


### Bug Fixes

* **index:** don't set `to` value (`options`) ([#339](https://github.com/postcss/postcss-loader/issues/339)) ([cdbb8b6](https://github.com/postcss/postcss-loader/commit/cdbb8b6))



<a name="2.1.0"></a>
# [2.1.0](https://github.com/postcss/postcss-loader/compare/v2.0.10...v2.1.0) (2018-02-02)


### Bug Fixes

* **index:** continue watching after dependency `{Error}` ([#332](https://github.com/postcss/postcss-loader/issues/332)) ([a8921cc](https://github.com/postcss/postcss-loader/commit/a8921cc))


### Features

* **index:** pass AST (`result.root`) && Messages (`result.messages`) as metadata to other loaders ([#322](https://github.com/postcss/postcss-loader/issues/322)) ([56232e7](https://github.com/postcss/postcss-loader/commit/56232e7))



<a name="2.0.10"></a>
## [2.0.10](https://github.com/postcss/postcss-loader/compare/v2.0.9...v2.0.10) (2018-01-03)


### Bug Fixes

* **index:** copy loader `options` before modifying ([#326](https://github.com/postcss/postcss-loader/issues/326)) ([61ff03c](https://github.com/postcss/postcss-loader/commit/61ff03c))



<a name="2.0.9"></a>
## [2.0.9](https://github.com/postcss/postcss-loader/compare/v2.0.8...v2.0.9) (2017-11-24)


### Bug Fixes

* **index:** filter `ident` (`options.ident`) ([#315](https://github.com/postcss/postcss-loader/issues/315)) ([3e1c7fa](https://github.com/postcss/postcss-loader/commit/3e1c7fa))



<a name="2.0.8"></a>
## [2.0.8](https://github.com/postcss/postcss-loader/compare/v2.0.6...v2.0.8) (2017-10-14)


### Bug Fixes

* **lib/options:** handle `{Object}` return (`options.plugins`) ([#301](https://github.com/postcss/postcss-loader/issues/301)) ([df010a7](https://github.com/postcss/postcss-loader/commit/df010a7))
* **schema:** allow to pass an `{Object}` (`options.syntax/options.stringifier`) ([#300](https://github.com/postcss/postcss-loader/issues/300)) ([58e9996](https://github.com/postcss/postcss-loader/commit/58e9996))



<a name="2.0.7"></a>
## [2.0.7](https://github.com/postcss/postcss-loader/compare/v2.0.6...v2.0.7) (2017-10-10)


### Bug Fixes

* sanitizing `from` and `to` options (`postcss.config.js`) ([#260](https://github.com/postcss/postcss-loader/issues/260)) ([753dea7](https://github.com/postcss/postcss-loader/commit/753dea7))
* **index:** runaway promise ([#269](https://github.com/postcss/postcss-loader/issues/269)) ([8df20ce](https://github.com/postcss/postcss-loader/commit/8df20ce))



<a name="2.0.6"></a>
## [2.0.6](https://github.com/postcss/postcss-loader/compare/v2.0.5...v2.0.6) (2017-06-14)


### Bug Fixes

* allow to pass an `{Object}` (`options.parser`) ([#257](https://github.com/postcss/postcss-loader/issues/257)) ([4974607](https://github.com/postcss/postcss-loader/commit/4974607))
* misspelling in warnings ([#237](https://github.com/postcss/postcss-loader/issues/237)) ([adcbb2e](https://github.com/postcss/postcss-loader/commit/adcbb2e))
* **index:** simplify config loading behaviour ([#259](https://github.com/postcss/postcss-loader/issues/259)) ([b313478](https://github.com/postcss/postcss-loader/commit/b313478))



<a name="2.0.5"></a>
## [2.0.5](https://github.com/postcss/postcss-loader/compare/v2.0.4...v2.0.5) (2017-05-10)


### Bug Fixes

* regression with `options.plugins` `{Function}` (`webpack.config.js`) (#229) ([dca52a9](https://github.com/postcss/postcss-loader/commit/dca52a9))



<a name="2.0.4"></a>
## [2.0.4](https://github.com/postcss/postcss-loader/compare/v2.0.3...v2.0.4) (2017-05-10)


### Bug Fixes

* **index:** `postcss.config.js` not resolved correctly (`options.config`) ([faaeee4](https://github.com/postcss/postcss-loader/commit/faaeee4))
* **index:** update validation schema, better warning message ([4f20c99](https://github.com/postcss/postcss-loader/commit/4f20c99))



<a name="2.0.3"></a>
## [2.0.3](https://github.com/postcss/postcss-loader/compare/v2.0.2...v2.0.3) (2017-05-09)


### Bug Fixes

* **index:** don't fail on 'sourceMap: false' && emit a warning instead, when previous map found (`options.sourceMap`) ([159b66a](https://github.com/postcss/postcss-loader/commit/159b66a))



<a name="2.0.2"></a>
## [2.0.2](https://github.com/postcss/postcss-loader/compare/v2.0.1...v2.0.2) (2017-05-09)


### Bug Fixes

* **index:** 'No PostCSS Config found' (`options.config`) (#215) ([e764761](https://github.com/postcss/postcss-loader/commit/e764761))



<a name="2.0.1"></a>
## [2.0.1](https://github.com/postcss/postcss-loader/compare/v2.0.0...v2.0.1) (2017-05-08)


### Bug Fixes

* **index:** 'Cannot create property `prev` on boolean `false`' (`options.sourceMap`) ([c4f0064](https://github.com/postcss/postcss-loader/commit/c4f0064))



<a name="2.0.0"></a>
# [2.0.0](https://github.com/postcss/postcss-loader/compare/1.2.2...v2.0.0) (2017-05-08)


### Features

* **index:** add ctx, ctx.file, ctx.options ([0dceb2c](https://github.com/postcss/postcss-loader/commit/0dceb2c))
* **index:** add options validation ([2b76df8](https://github.com/postcss/postcss-loader/commit/2b76df8))



## 1.3.3
* Remove `postcss-loader-before-processing` warning (by Michael Ciniawsky).

## 1.3.2
* Fix deprecated warning (by Xiaoyu Zhai).

## 1.3.1
* Fix conflict with CLI `--config` argument (by EGOIST).

## 1.3
* Allow object in syntax options, not only path for require (by Jeff Escalante).

## 1.2.2
* Watch `postcss.config.js` for changes (by Michael Ciniawsky).

## 1.2.1
* Fix relative `config` parameter resolving (by Simen Bekkhus).

## 1.2
* Add `config` parameter (by sainthkh).

## 1.1.1
* Fix `this` in options function (by Jeff Escalante).

## 1.1
* PostCSS common config could be placed to subdirs.
* Add webpack instance to PostCSS common config context.

## 1.0
* Add common PostCSS config support (by Mateusz Derks).
* Add Webpack 2 support with `plugins` query option (by Izaak Schroeder).
* Add `dependency` message support.
* Rewrite docs (by Michael Ciniawsky).

## 0.13
* Add `exec` parameter (by Neal Granger).

## 0.12
* Add CSS syntax highlight to syntax error code frame.

## 0.11.1
* Fix Promise API (by Daniel Haus).

## 0.11
* Add `postcss-loader-before-processing` webpack event (by Jan Nicklas).

## 0.10.1
* Better syntax error message (by Andrey Popp).

## 0.10.0
* Add `sourceMap` parameter to force inline maps (by 雪狼).

## 0.9.1
* Fix plugin in simple array config.

## 0.9
* Allow to pass syntax, parser or stringifier as function (by Jeff Escalante).

## 0.8.2
* Fix source map support (by Andrew Bradley).

## 0.8.1
* Fix resource path.

## 0.8
* Add postcss-js support (by Simon Degraeve).

## 0.7
* Added argument with webpack instance to plugins callback (by Maxime Thirouin).

## 0.6
* Use PostCSS 5.0.
* Remove `safe` parameter. Use Safe Parser.
* Add `syntax`, `parser` and `stringifier` parameters.

## 0.5.1
* Fix string source map support (by Jan Nicklas).

## 0.5.0
* Set plugins by function for hot reload support (by Stefano Brilli).

## 0.4.4
* Fix error on empty PostCSS config.

## 0.4.3
* Better check for `CssSyntaxError`.

## 0.4.2
* Fixed invalid sourcemap exception (by Richard Willis).

## 0.4.1
* Use only Promise API to catch PostCSS errors.

## 0.4
* Add PostCSS asynchronous API support.
* Fix source map support (by Richard Willis).
* Add warnings API support.
* Better output for CSS syntax errors.

## 0.3
* Use PostCSS 4.0.

## 0.2
* Use PostCSS 3.0.

## 0.1
* Initial release.
