# Contributing

## Publishing to NPM

- Bump version number in `/package.json`
- Build the package by running `npm/yarn build`
- Deploy from dist folder `cd ./dist && yarn/npm publish`
- commit to main and tag the commit with its version `vX.X.X`
- `git push --tags`
- Go to https://github.com/kriasoft/isomorphic-style-loader/releases and add your release notes
