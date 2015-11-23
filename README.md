# Isomorphic CSS style loader for [Webpack](http://webpack.github.io)

[![NPM version](http://img.shields.io/npm/v/isomorphic-style-loader.svg?style=flat-square)](https://www.npmjs.com/package/isomorphic-style-loader)
[![NPM downloads](http://img.shields.io/npm/dm/isomorphic-style-loader.svg?style=flat-square)](https://www.npmjs.com/package/isomorphic-style-loader)
[![Build Status](http://img.shields.io/travis/kriasoft/isomorphic-style-loader/master.svg?style=flat-square)](https://travis-ci.org/kriasoft/isomorphic-style-loader)
[![Dependency Status](http://img.shields.io/david/kriasoft/isomorphic-style-loader.svg?style=flat-square)](https://david-dm.org/kriasoft/isomorphic-style-loader)
[![Chat](http://img.shields.io/badge/chat_room-%23react--starter--kit-blue.svg?style=flat-square)](https://gitter.im/kriasoft/react-starter-kit)

(early preview)

> An alternative CSS style loader, which works similarly to
> [style-loader](https://github.com/webpack/style-loader), but is optimized for
> [isomorphic apps](http://nerds.airbnb.com/isomorphic-javascript-future-web-apps/).
> In addition to what style-loader provides, it allow to render "critical CSS"
> on a server, during server-side rendering (SSR).

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

Note: Configuration is the same for both client-side and server-side bundles.

##### Example 1: Stateless React component:

```js
import React, { PropTypes } from 'react';
import s from './MyComponent.scss';

function MyComponent(props, context) {
  context.insertCss(s);                           // <--
  return (
    <div className={s.root}>
      <h1 className={s.title}>Hello, world!</h1>
    </div>
  );
}

MyComponent.contextTypes = { insertCss: PropTypes.func.isRequired };

export default MyComponent;
```

##### Example 2: Statefull React component:

```js
import React, { Component, PropTypes } from 'react';
import s from './MyComponent.scss';

class MyComponent extends Component {

  static contextTypes = { insertCss: PropTypes.func.isRequired };

  componentWillMount() {
    this.removeCss = this.context.insertCss(s);   // <--
  }

  componentWillUnmount() {
    this.removeCss();                             // <--
  }

  render() {
    return (
      <div className={s.root}>
        <h1 className={s.title}>Hello, world!</h1>
      </div>
    );
  }

}

export default MyComponent;
```

Pre-rendered HTML page (example):

```html
<html>
  <head>
    <title>My Application</title>
    <style>
      .MyComponent_root_Hi8 { padding: 10px; }
      .MyComponent_title_e9Q { color: red; } 
    </style>                                    
    <script src="app.js" async></async>
  </head>
  <body>
    <div id="app">
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
issue and improving client-side performance.

### Related Projects

 * [React Starter Kit](https://github.com/kriasoft/react-starter-kit) — Isomorphic web app boilerplate

### Support

 * [#react-starter-kit](https://gitter.im/kriasoft/react-starter-kit) on Gitter
 * [@koistya](https://www.codementor.io/koistya) on Codementor

### License

The MIT License © 2015 Kriasoft, LLC. All rights reserved.

---
Made with ♥ by Konstantin Tarkus ([@koistya](https://twitter.com/koistya))
