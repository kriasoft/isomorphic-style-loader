/*! Isomorphic Style Loader | MIT License | https://github.com/kriasoft/isomorphic-style-loader */

'use strict';

var React = require('react');
var PropTypes = require('prop-types');
var hoistStatics = require('hoist-non-react-statics');
var StyleContext = require('./StyleContext.js');

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var _excluded = ["__$$withStylesRef"];

function withStyles() {
  for (var _len = arguments.length, styles = new Array(_len), _key = 0; _key < _len; _key++) {
    styles[_key] = arguments[_key];
  }

  return function wrapWithStyles(ComposedComponent) {
    var WithStyles = function (_React$PureComponent) {
      _inheritsLoose(WithStyles, _React$PureComponent);

      function WithStyles(props, context) {
        var _this;

        _this = _React$PureComponent.call(this, props, context) || this;
        _this.removeCss = context.insertCss.apply(context, styles);
        return _this;
      }

      var _proto = WithStyles.prototype;

      _proto.componentWillUnmount = function componentWillUnmount() {
        if (typeof this.removeCss === 'function') {
          setTimeout(this.removeCss, 0);
        }
      };

      _proto.render = function render() {
        var _this$props = this.props,
            __$$withStylesRef = _this$props.__$$withStylesRef,
            props = _objectWithoutPropertiesLoose(_this$props, _excluded);

        return React.createElement(ComposedComponent, _extends({
          ref: __$$withStylesRef
        }, props));
      };

      return WithStyles;
    }(React.PureComponent);

    var displayName = ComposedComponent.displayName || ComposedComponent.name || 'Component';
    WithStyles.propTypes = {
      __$$withStylesRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({
        current: PropTypes.instanceOf(typeof Element === 'undefined' ? Function : Element)
      })])
    };
    WithStyles.defaultProps = {
      __$$withStylesRef: undefined
    };
    WithStyles.contextType = StyleContext;
    var ForwardedWithStyles = React.forwardRef(function (props, ref) {
      return React.createElement(WithStyles, _extends({}, props, {
        __$$withStylesRef: ref
      }));
    });
    ForwardedWithStyles.ComposedComponent = ComposedComponent;
    ForwardedWithStyles.displayName = "WithStyles(" + displayName + ")";
    return hoistStatics(ForwardedWithStyles, ComposedComponent);
  };
}

module.exports = withStyles;
//# sourceMappingURL=withStyles.js.map
