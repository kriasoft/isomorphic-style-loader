# Isomorphic Style Loader Change Log

All notable changes to this project will be documented in this file.

## [v1.1.0] - 2016-10-30

- Disable source maps in IE9 and below, to prevent runtime errors in development mode ([#69](https://github.com/kriasoft/isomorphic-style-loader/pull/69))
- Improve source maps support by making sourceURL field unique ([#44](https://github.com/kriasoft/isomorphic-style-loader/pull/44), [#69](https://github.com/kriasoft/isomorphic-style-loader/pull/69))
- Add access to content to deduplicate server-side generated styles ([#56](https://github.com/kriasoft/isomorphic-style-loader/pull/56))
- Use HMR (Hot Module Replacement) if available, no debug option required ([#57](https://github.com/kriasoft/isomorphic-style-loader/pull/57))
- Use [hoist-non-react-statics](https://github.com/mridgway/hoist-non-react-statics) to copy non-react
  specific statics from a child to a parent component inside `withStyles` HOC (Higher-Order Component)
  ([#38](https://github.com/kriasoft/isomorphic-style-loader/pull/38))
- Add `CHANGELOG.md` file with the past and future (planned) changes to the project

## [v1.0.0] - 2016-04-15

- Improve comparability with Hot Module Replacement (HMR) ([#33](https://github.com/kriasoft/isomorphic-style-loader/pull/33))
- Add support of ES2015+ decorator syntax, e.g. `@withStyles(s) class MyComponent extends Component { .. }`
  [PR#21](https://github.com/kriasoft/isomorphic-style-loader/pull/21) (BREAKING CHANGE)

## [v0.0.12] - 2016-03-04

- Fix style not getting removed for multiple instance ([#23](https://github.com/kriasoft/isomorphic-style-loader/pull/23))

[unreleased]: https://github.com/kriasoft/isomorphic-style-loader/compare/v1.1.0...HEAD
[v1.1.0]: https://github.com/kriasoft/isomorphic-style-loader/compare/v1.0.0...v1.1.0
[v1.0.0]: https://github.com/kriasoft/isomorphic-style-loader/compare/v0.0.12...v1.0.0
[v0.0.12]: https://github.com/kriasoft/isomorphic-style-loader/compare/v0.0.11...v0.0.12
