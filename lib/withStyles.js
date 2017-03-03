'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _hoistNonReactStatics = require('hoist-non-react-statics');

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

var contextTypes = {
  insertCss: _react.PropTypes.func
};

function withStyles() {
  for (var _len = arguments.length, styles = Array(_len), _key = 0; _key < _len; _key++) {
    styles[_key] = arguments[_key];
  }

  return function wrapWithStyles(ComposedComponent) {
    var WithStyles = function (_Component) {
      (0, _inherits3.default)(WithStyles, _Component);

      function WithStyles() {
        (0, _classCallCheck3.default)(this, WithStyles);
        return (0, _possibleConstructorReturn3.default)(this, (WithStyles.__proto__ || (0, _getPrototypeOf2.default)(WithStyles)).apply(this, arguments));
      }

      (0, _createClass3.default)(WithStyles, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
          this.removeCss = this.context.insertCss && this.context.insertCss.apply(undefined, styles);
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          setTimeout(this.removeCss, 0);
        }
      }, {
        key: 'render',
        value: function render() {
          return _react2.default.createElement(ComposedComponent, this.props);
        }
      }]);
      return WithStyles;
    }(_react.Component);

    var displayName = ComposedComponent.displayName || ComposedComponent.name || 'Component';

    WithStyles.displayName = 'WithStyles(' + displayName + ')';
    WithStyles.contextTypes = contextTypes;
    WithStyles.ComposedComponent = ComposedComponent;

    return (0, _hoistNonReactStatics2.default)(WithStyles, ComposedComponent);
  };
}

exports.default = withStyles;