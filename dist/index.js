/*! Isomorphic Style Loader | MIT License | https://github.com/kriasoft/isomorphic-style-loader */

'use strict';

var loaderUtils = require('loader-utils');

module.exports = function loader() {};

module.exports.pitch = function pitch(request) {
  if (this.cacheable) {
    this.cacheable();
  }

  var insertCss = require.resolve('./insertCss.js');

  return "\n    var refs = 0;\n    var css = require(" + loaderUtils.stringifyRequest(this, "!!" + request) + ");\n    var insertCss = require(" + loaderUtils.stringifyRequest(this, "!" + insertCss) + ");\n    var content = typeof css === 'string' ? [[module.id, css, '']] : css;\n\n    exports = module.exports = css.locals || {};\n    exports._getContent = function() { return content; };\n    exports._getCss = function() { return '' + css; };\n    exports._insertCss = function(options) { return insertCss(content, options) };\n\n    // Hot Module Replacement\n    // https://webpack.github.io/docs/hot-module-replacement\n    // Only activated in browser context\n    if (module.hot && typeof window !== 'undefined' && window.document) {\n      var removeCss = function() {};\n      module.hot.accept(" + loaderUtils.stringifyRequest(this, "!!" + request) + ", function() {\n        css = require(" + loaderUtils.stringifyRequest(this, "!!" + request) + ");\n        content = typeof css === 'string' ? [[module.id, css, '']] : css;\n        removeCss = insertCss(content, { replace: true });\n      });\n      module.hot.dispose(function() { removeCss(); });\n    }\n  ";
};
//# sourceMappingURL=index.js.map
