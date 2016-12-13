# Isomorphic CSS style loader for [Webpack](http://webpack.github.io)

[![NPM version](http://img.shields.io/npm/v/isomorphic-style-loader.svg?style=flat-square)](https://www.npmjs.com/package/isomorphic-style-loader)
[![NPM downloads](http://img.shields.io/npm/dm/isomorphic-style-loader.svg?style=flat-square)](https://www.npmjs.com/package/isomorphic-style-loader)
[![Build Status](http://img.shields.io/travis/kriasoft/isomorphic-style-loader/master.svg?style=flat-square)](https://travis-ci.org/kriasoft/isomorphic-style-loader)
[![Coverage Status](https://img.shields.io/coveralls/kriasoft/isomorphic-style-loader.svg?style=flat-square)](https://coveralls.io/github/kriasoft/isomorphic-style-loader)
[![Dependency Status](http://img.shields.io/david/kriasoft/isomorphic-style-loader.svg?style=flat-square)](https://david-dm.org/kriasoft/isomorphic-style-loader)
[![Chat](http://img.shields.io/badge/chat_room-%23react--starter--kit-blue.svg?style=flat-square)](https://gitter.im/kriasoft/react-starter-kit)

> An alternative CSS style loader, which works similarly to
> [style-loader](https://github.com/webpack/style-loader), but is optimized for
> [isomorphic apps](http://nerds.airbnb.com/isomorphic-javascript-future-web-apps/).
> In addition to what style-loader provides, it allow to render
> [critical path CSS](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/)
> during server-side rendering (SSR), by adding two helper methods on to the
> `styles` object - `._insertCss()` (injects CSS into the DOM) and `._getCss()`
> (returns CSS string).

See [getting started](#getting-started) &nbsp;|&nbsp; [changelog](CHANGELOG.md) &nbsp;|&nbsp;
Join [#react-starter-kit](https://gitter.im/kriasoft/react-starter-kit) chat room on Gitter to stay
up to date

### How to Install

```
$ npm install isomorphic-style-loader --save-dev
```

### Getting Started

##### Webpack configuration:

```js
{
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: [
          'isomorphic-style-loader',
          'css-loader?modules&localIdentName=[name]_[local]_[hash:base64:3]',
          'postcss-loader'
        ]
      }
    ]
  }
}
```

**Note**: Configuration is the same for both client-side and server-side bundles.

##### React component example

```scss
// MyComponent.scss
.root { padding: 10px; }
.title { color: red; }
```

```js
// MyComponent.js
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './MyComponent.scss';

function MyComponent(props, context) {
  return (
    <div className={s.root}>
      <h1 className={s.title}>Hello, world!</h1>
    </div>
  );
}

export default withStyles(s)(MyComponent);        // <--
```

**P.S.**: It works great with [CSS Modules](https://github.com/css-modules/css-modules)!
Just decorate your React component with the [withStyles](https://github.com/kriasoft/isomorphic-style-loader/blob/master/src/withStyles.js)
higher-order component, and pass a function to your React app via `insertCss`
context variable (see [React's context API](https://facebook.github.io/react/docs/context))
that either calls `styles._insertCss()` on a client, or `styles._getCss()`
on the server. See server-side rendering example below:

```js
import express from 'express';
import ReactDOM from 'react-dom';
import router from './router.js'; // <-- isomorphic router, see react-starter-kit for example

const server = express();
const port = process.env.PORT || 3000;

// Server-side rendering of the React app
server.get('*', (req, res, next) =>
  const css = new Set(); // CSS for all rendered React components
  const context = { insertCss: (...styles) => styles.forEach(style => css.add(style._getCss())); };
  router.dispatch({ ...req, context }).then((component, state) => {
    const body = ReactDOM.renderToString(component);
    const html = `<!doctype html>
      <html>
        <head>
          <script async src="/client.js"></script>
          <style type="text/css">${[...css].join('')}</style>
        </head>
        <body>
          <div id="root">${body}</div>
        </body>
      </html>`;
    res.status(state.statusCode).send(html);
  }).catch(next);
});

server.listen(port, () => {
  console.log(`Node.js app is running at http://localhost:${port}/`);
});
```

It should generate an HTML output similar to this one:

```html
<html>
  <head>
    <title>My Application</title>
    <script async src="/client.js"></script>
    <style type="text/css">
      .MyComponent_root_Hi8 { padding: 10px; }
      .MyComponent_title_e9Q { color: red; }
    </style>
  </head>
  <body>
    <div id="root">
      <div class="MyComponent_root_Hi8" data-reactid=".cttboum80" data-react-checksum="564584530">
        <h1 class="MyComponent_title_e9Q" data-reactid=".cttboum80.0">Hello, World!</h1>
      </div>
    </div>
  </body>
</html>
```

Regardless of how many styles components there are in the `app.js` bundle,
only critical CSS is going to be rendered on the server inside the `<head>`
section of HTML document. Critical CSS is what actually used on the
requested web page, effectively dealing with [FOUC](https://en.wikipedia.org/wiki/Flash_of_unstyled_content)
issue and improving client-side performance. CSS of the unmounted components
will be removed from the DOM.

##### Hot Reload

You can activate hot module reload for style by setting the `debug` option to true in your webpack
configuration. If you are using webpack 2, you need to supply it though the `LoaderOptionsPlugin`
because the [`debug` option has been removed](https://gist.github.com/sokra/27b24881210b56bbaff7#loader-options--minimize).

### Backers

♥ Isomorphic Style Loader? Help us keep it alive by [donating funds](https://www.patreon.com/tarkus) to cover project expenses!

<a href="https://github.com/koistya" target="_blank">
  <img src="https://github.com/koistya.png?size=64">
</a>
<a href="https://www.patreon.com/bePatron?patAmt=25&amp;u=2475816" target="_blank">
  <img src="https://opencollective.com/static/images/become_backer.svg">
</a>

### Related Projects

 * [React Starter Kit](https://github.com/kriasoft/react-starter-kit) — Isomorphic web app boilerplate

### Support

 * [#react-starter-kit](https://gitter.im/kriasoft/react-starter-kit) on Gitter
 * [@koistya](https://www.codementor.io/koistya) on Codementor

### License

The MIT License © 2015-2016 Kriasoft, LLC. All rights reserved.

---
Made with ♥ by Konstantin Tarkus ([@koistya](https://twitter.com/koistya)) and [contributors](https://github.com/kriasoft/isomorphic-style-loader/graphs/contributors)
