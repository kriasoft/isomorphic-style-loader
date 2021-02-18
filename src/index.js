/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { stringifyRequest } from 'loader-utils'

module.exports = function loader() {}
module.exports.pitch = function pitch(request) {
  if (this.cacheable) {
    this.cacheable()
  }

  const insertCss = require.resolve('./insertCss.js')
  return `
    var refs = 0;
    var css = require(${stringifyRequest(this, `!!${request}`)});
    if(css.default) {
      css = css.default
    }
    var insertCss = require(${stringifyRequest(this, `!${insertCss}`)});
    var content = [[module.id, css, '']];

    //lift locals up
    if(typeof css === 'object' && typeof css.locals === 'object') {
      Object.keys(css.locals).forEach((k) => {
        if(k.indexOf('-') === -1) {
          css[k] = css.locals[k]
        }
      })
    }

    exports = module.exports = css || {};
    exports._getContent = function() { return content; };
    exports._getCss = function() { return '' + css; };
    exports._insertCss = function(options) { return insertCss(content, options) };

    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (module.hot && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept(${stringifyRequest(this, `!!${request}`)}, function() {
        css = require(${stringifyRequest(this, `!!${request}`)});
        if(css.default) {
          css = css.default
        }
        content = [[module.id, css, '']];
        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  `
}
