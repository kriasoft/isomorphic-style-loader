/*! Isomorphic Style Loader | MIT License | https://github.com/kriasoft/isomorphic-style-loader */

'use strict';

var react = require('react');
var StyleContext = require('./StyleContext.js');

var isBrowser = function () {
  return this && typeof this.window === 'object';
}();

function useStyles() {
  for (var _len = arguments.length, styles = new Array(_len), _key = 0; _key < _len; _key++) {
    styles[_key] = arguments[_key];
  }

  var _useContext = react.useContext(StyleContext),
      insertCss = _useContext.insertCss;

  if (!insertCss) throw new Error('Please provide "insertCss" function by StyleContext.Provider');

  var runEffect = function runEffect() {
    var removeCss = insertCss.apply(void 0, styles);
    return function () {
      setTimeout(removeCss, 0);
    };
  };

  if (isBrowser) {
    react.useEffect(runEffect, []);
  } else {
    runEffect();
  }
}

module.exports = useStyles;
//# sourceMappingURL=useStyles.js.map
