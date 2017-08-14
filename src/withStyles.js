/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import hoistStatics from 'hoist-non-react-statics';

const contextTypes = {
  insertCss: PropTypes.func,
};

function withStyles(...styles) {
  return function wrapWithStyles(ComposedComponent) {
    class WithStyles extends Component {
      componentWillMount() {
        if (this.context.insertCss) {
          this.removeCss = this.context.insertCss.apply(undefined, styles);
        } else if (typeof document !== 'undefined') {
          // eslint-disable-next-line no-underscore-dangle
          this.removeCss = styles.forEach(style => style._insertCss());
        } else {
          throw new Error('Failed to insert CSS, ensure you are providing the insertCss function in context when rendering server side');
        }
      }

      componentWillUnmount() {
        if (this.removeCss) {
          setTimeout(this.removeCss, 0);
        }
      }

      render() {
        return <ComposedComponent {...this.props} />;
      }
    }

    const displayName = ComposedComponent.displayName || ComposedComponent.name || 'Component';

    WithStyles.displayName = `WithStyles(${displayName})`;
    WithStyles.contextTypes = contextTypes;
    WithStyles.ComposedComponent = ComposedComponent;

    return hoistStatics(WithStyles, ComposedComponent);
  };
}

export default withStyles;
