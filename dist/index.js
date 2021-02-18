/*! Isomorphic Style Loader | MIT License | https://github.com/kriasoft/isomorphic-style-loader */

'use strict';

var loaderUtils = require('loader-utils');

module.exports = function loader() {};

module.exports.pitch = function pitch(request) {
  if (this.cacheable) {
    this.cacheable();
  }

  var insertCss = require.resolve('./insertCss.js');

  return "\n    var refs = 0;\n    var css = require(" + loaderUtils.stringifyRequest(this, "!!" + request) + ");\n    if(css.default) {\n      css = css.default\n    }\n    var insertCss = require(" + loaderUtils.stringifyRequest(this, "!" + insertCss) + ");\n    var content = [[module.id, css, '']];\n\n    //lift locals up\n    if(typeof css === 'object' && typeof css.locals === 'object') {\n      Object.keys(css.locals).forEach((k) => {\n        if(k.indexOf('-') === -1) {\n          css[k] = css.locals[k]\n        }\n      })\n    }\n\n    exports = module.exports = css || {};\n    exports._getContent = function() { return content; };\n    exports._getCss = function() { return '' + css; };\n    exports._insertCss = function(options) { return insertCss(content, options) };\n\n    // Hot Module Replacement\n    // https://webpack.github.io/docs/hot-module-replacement\n    // Only activated in browser context\n    if (module.hot && typeof window !== 'undefined' && window.document) {\n      var removeCss = function() {};\n      module.hot.accept(" + loaderUtils.stringifyRequest(this, "!!" + request) + ", function() {\n        css = require(" + loaderUtils.stringifyRequest(this, "!!" + request) + ");\n        if(css.default) {\n          css = css.default\n        }\n        content = [[module.id, css, '']];\n        removeCss = insertCss(content, { replace: true });\n      });\n      module.hot.dispose(function() { removeCss(); });\n    }\n  ";
};
//# sourceMappingURL=index.js.map
