<img width="150" height="150" align="right" src="https://raw.githubusercontent.com/kriasoft/isomorphic-style-loader/8fe56ef8fba794e00bfbc9b6d731edf0f572d4e7/logo.png" />

# Isomorphic CSS style loader for [Webpack](http://webpack.github.io)

[![NPM version](https://img.shields.io/npm/v/isomorphic-style-loader.svg)](https://www.npmjs.com/package/isomorphic-style-loader)
[![NPM downloads](https://img.shields.io/npm/dw/isomorphic-style-loader.svg)](https://www.npmjs.com/package/isomorphic-style-loader)
[![Library Size](https://img.shields.io/github/size/kriasoft/isomorphic-style-loader/src/withStyles.js.svg)](https://bundlephobia.com/result?p=isomorphic-style-loader)
[![Online Chat](https://badges.gitter.im/kriasoft/isomorphic-style-loader.svg)](https://gitter.im/kriasoft/react-starter-kit)

CSS style loader for Webpack that works similarly to
[style-loader](https://github.com/webpack/style-loader), but is optimized for
[critical path CSS](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/)
rendering and also works great in the context of
[isomorphic apps](http://nerds.airbnb.com/isomorphic-javascript-future-web-apps/).
It provides two helper methods on to the `styles` object - `._insertCss()`
(injects CSS into the DOM) and `._getCss()` (returns a CSS string).

See [getting started](#getting-started) &nbsp;|&nbsp; [changelog](CHANGELOG.md) &nbsp;|&nbsp;
Join [#react-starter-kit](https://gitter.im/kriasoft/react-starter-kit)
chat room on Gitter to stay up to date

## How to Install

```bash
$ npm install isomorphic-style-loader --save-dev
```

## Getting Started

**Webpack configuration:**

```js
module.exports = {
  /* ... */
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'isomorphic-style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      }
    ]
  }
  /* ... */
}
```

**Note**: Configuration is the same for both client-side and server-side bundles. For more
information visit https://webpack.js.org/configuration/module/.

**React component example:**

```css
/* App.css */
.root { padding: 10px }
.title { color: red }
```

```js
/* App.js */
import React from 'react'
import withStyles from 'isomorphic-style-loader/withStyles'
import s from './App.scss'

function App(props, context) {
  return (
    <div className={s.root}>
      <h1 className={s.title}>Hello, world!</h1>
    </div>
  )
}

export default withStyles(s)(App) // <--
```

**P.S.**: It works great with [CSS Modules](https://github.com/css-modules/css-modules)!
Just decorate your React component with the
[withStyles](https://github.com/kriasoft/isomorphic-style-loader/blob/master/src/withStyles.js)
higher-order component, and pass a function to your React app via `insertCss`
context variable (see [React's context API](https://reactjs.org/docs/context.html))
that either calls `styles._insertCss()` on a client or `styles._getCss()`
on the server. See server-side rendering example below:

```js
import express from 'express'
import React from 'react'
import ReactDOM from 'react-dom'
import StyleContext from 'isomorphic-style-loader/StyleContext'
import App from './App.js'

const server = express()
const port = process.env.PORT || 3000

// Server-side rendering of the React app
server.get('*', (req, res, next) => {
  const css = new Set() // CSS for all rendered React components
  const insertCss = (...styles) => styles.forEach(style => css.add(style._getCss()))
  const body = ReactDOM.renderToString(
    <StyleContext.Provider value={{ insertCss }}>
      <App />
    </StyleContext.Provider>
  )
  const html = `<!doctype html>
    <html>
      <head>
        <script src="client.js" defer></script>
        <style>${[...css].join('')}</style>
      </head>
      <body>
        <div id="root">${body}</div>
      </body>
    </html>`
  res.status(200).send(html)
})

server.listen(port, () => {
  console.log(`Node.js app is running at http://localhost:${port}/`)
})
```

It should generate an HTML output similar to this one:

```html
<html>
  <head>
    <title>My Application</title>
    <script async src="/client.js"></script>
    <style type="text/css">
      .App_root_Hi8 { padding: 10px }
      .App_title_e9Q { color: red }
    </style>
  </head>
  <body>
    <div id="root">
      <div class="App_root_Hi8">
        <h1 class="App_title_e9Q">Hello, World!</h1>
      </div>
    </div>
  </body>
</html>
```

Regardless of how many styles components there are in the `app.js` bundle,
only critical CSS is going to be rendered on the server inside the `<head>`
section of HTML document. Critical CSS is what actually used on the
requested web page, effectively dealing with
[FOUC](https://en.wikipedia.org/wiki/Flash_of_unstyled_content)
issue and improving client-side performance.
CSS of the unmounted components will be removed from the DOM.

Then on client-side use [hydrate](https://reactjs.org/docs/react-dom.html#hydrate)
to make your markup interactive:

```js
import React from 'react'
import ReactDOM from 'react-dom'
import StyleContext from 'isomorphic-style-loader/StyleContext'
import App from './App.js'

const insertCss = (...styles) => {
  const removeCss = styles.map(style => style._insertCss())
  return () => removeCss.forEach(dispose => dispose())
}

ReactDOM.hydrate(
  <StyleContext.Provider value={{ insertCss }}>
    <App />
  </StyleContext.Provider>,
  document.getElementById('root')
)
```

**React Hooks Support:**

You can also use `useStyles` inside your React Functional Components, instead of using `withStyles`.
Please note that you still need to pass `insertCss` function to `StyleContext.Provider` from top of the tree.

```js
import React from 'react'
import useStyles from 'isomorphic-style-loader/useStyles'
import s from './App.scss'

const App = (props) => {
  useStyles(s);
  return (
    <div className={s.root}>
      <h1 className={s.title}>Hello, world!</h1>
    </div>
  )
};

export default App;
```

## Related Projects

* [React Starter Kit](https://github.com/kriasoft/react-starter-kit) —
  Isomorphic web app boilerplate (Express.js, React, Relay)
* [Node.js API Starter](https://github.com/kriasoft/nodejs-api-starter) —
  Project tempalte for building GraphQL API backends

## License

The MIT License © 2015-present Kriasoft ([@kriasoft](https://twitter.com/kriasoft)).
All rights reserved.

---
Made with ♥ by
Konstantin Tarkus ([@koistya](https://twitter.com/koistya), [blog](https://medium.com/@tarkus)),
Vladimir Kutepov ([frenzzy](https://github.com/frenzzy))
and [contributors](https://github.com/kriasoft/isomorphic-style-loader/graphs/contributors)
