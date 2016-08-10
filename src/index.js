/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015-2016 Kriasoft, LLC. All rights reserved.
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
  const createUniqueIdentifiersPath = path.join(__dirname, './createUniqueIdentifiers.js');
  let output = `
    var content = require(${stringifyRequest(this, `!!${remainingRequest}`)});
    var insertCss = require(${stringifyRequest(this, `!${insertCssPath}`)});
    var createUniqueIdentifiers =
      require(${stringifyRequest(this, `!${createUniqueIdentifiersPath}`)});

    if (typeof content === 'string') {
      content = [[module.id, content, '']];
    } else {
      var identifiers = content.map(x => x[0]);
      createUniqueIdentifiers(identifiers).map((identifier, index) => {
        content[index][0] = identifier;
      })
    }

    module.exports = content.locals || {};
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
  `;

  output += this.debug ? `
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (module.hot && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept(${stringifyRequest(this, `!!${remainingRequest}`)}, function() {
        content = require(${stringifyRequest(this, `!!${remainingRequest}`)});

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  ` : '';

  return output;
};
