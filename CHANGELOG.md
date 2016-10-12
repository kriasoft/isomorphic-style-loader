## Isomorphic Style Loader Change Log

All notable changes to this project will be documented in this file.

### [Unreleased][unreleased]
- Add `CHANGELOG.md` file with the past and future (planned) changes to the project

> 2016-10-12

- Add access to content to dedup server generated styles [PR#56](https://github.com/kriasoft/isomorphic-style-loader/pull/56)

### [v1.0.0]
> 2016-04-15

- Improve comparability with Hot Module Replacement (HMR) [PR#33](https://github.com/kriasoft/isomorphic-style-loader/pull/33)
- Add support of ES2015+ decorator syntax, e.g. `@withStyles(s) class MyComponent extends Component { .. }`
  [PR#21](https://github.com/kriasoft/isomorphic-style-loader/pull/21) (BREAKING CHANGE)

### [v0.0.12]
> 2016-03-04

- Fix style not getting removed for multiple instance [PR#23](https://github.com/kriasoft/isomorphic-style-loader/pull/23)

[unreleased]: https://github.com/kriasoft/isomorphic-style-loader/compare/v1.0.0...HEAD
[v1.0.0]: https://github.com/kriasoft/isomorphic-style-loader/compare/v0.0.12...v1.0.0
[v0.0.12]: https://github.com/kriasoft/isomorphic-style-loader/compare/v0.0.11...v0.0.12
