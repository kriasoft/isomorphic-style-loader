/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import path from 'path';
import loaderUtils from 'loader-utils';

module.exports = function loader() {};
module.exports.pitch = function pitch(remainingRequest) {
  if (this.cacheable) {
    this.cacheable();
  }

  let output = `
    var content = require(${loaderUtils.stringifyRequest(this, '!!' + remainingRequest)});
    var insertCss = require(${loaderUtils.stringifyRequest(this, '!' + path.join(__dirname, './insertCss.js'))});

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
    if (module.hot) {
      module.hot.accept(${loaderUtils.stringifyRequest(this, '!!' + remainingRequest)}, function() {
        var newContent = require(${loaderUtils.stringifyRequest(this, '!!' + remainingRequest)});
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
