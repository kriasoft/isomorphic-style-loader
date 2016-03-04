/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import path from 'path';
import { stringifyRequest } from 'loader-utils';

module.exports = function loader() {};
module.exports.pitch = function pitch(remainingRequest) {
  if (this.cacheable) {
    this.cacheable();
  }

  const insertCssPath = path.join(__dirname, './insertCss.js');
  let output = `
    var content = require(${stringifyRequest(this, `!!${remainingRequest}`)});
    var insertCss = require(${stringifyRequest(this, `!${insertCssPath}`)});

    if (typeof content === 'string') {
      content = [[module.id, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = insertCss.bind(null, content);
  `;

  output += this.debug ? `
    var removeCss = function() {};

    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (module.hot && typeof window !== 'undefined' && window.document) {
      module.hot.accept(${stringifyRequest(this, `!!${remainingRequest}`)}, function() {
        var newContent = require(${stringifyRequest(this, `!!${remainingRequest}`)});
        if (typeof newContent === 'string') {
          newContent = [[module.id, content, '']];
        }
        removeCss = insertCss(newContent, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  ` : '';

  return output;
};
