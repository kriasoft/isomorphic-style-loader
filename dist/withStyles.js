/*! Isomorphic Style Loader | MIT License | https://github.com/kriasoft/isomorphic-style-loader */

'use strict';

var React = require('react');
var PropTypes = require('prop-types');
var hoistStatics = require('hoist-non-react-statics');
var StyleContext = require('./StyleContext.js');

function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}
function _inheritsLoose(t, o) {
  t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o);
}
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (e.includes(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, _setPrototypeOf(t, e);
}

var _excluded = ["__$$withStylesRef"];
function withStyles() {
  for (var _len = arguments.length, styles = new Array(_len), _key = 0; _key < _len; _key++) {
    styles[_key] = arguments[_key];
  }
  return function wrapWithStyles(ComposedComponent) {
    var WithStyles = function (_React$PureComponent) {
      function WithStyles(props, context) {
        var _this;
        _this = _React$PureComponent.call(this, props, context) || this;
        _this.removeCss = context.insertCss.apply(context, styles);
        return _this;
      }
      _inheritsLoose(WithStyles, _React$PureComponent);
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
