/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import hoistStatics from 'hoist-non-react-statics';

function getDisplayName(ComposedComponent) {
  return ComposedComponent.displayName || ComposedComponent.name || 'Component';
}

function withStyles(...styles) {
  return function wrapWithStyles(ComposedComponent) {
    class WithStyles extends Component {
      static contextTypes = {
        insertCss: PropTypes.func,
      };

      static displayName = `WithStyles(${getDisplayName(ComposedComponent)})`;
      static ComposedComponent = ComposedComponent;

      componentWillMount() {
        this.removeCss = this.context.insertCss && this.context.insertCss.apply(undefined, styles);
      }

      componentWillUnmount() {
        setTimeout(this.removeCss, 0);
      }

      render() {
        return <ComposedComponent {...this.props} />;
      }
    }

    return hoistStatics(WithStyles, ComposedComponent);
  };
}

export default withStyles;
