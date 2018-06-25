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

const Context = React.createContext(() => {
  throw new Error('Please place <InsertCssProvider value={insertCss}> on upper position in the component tree.');
});
export const InsertCssProvider = Context.Provider;
const InsertCssConsumer = Context.Consumer;

export default function withStyles(...styles) {
  return function wrapWithStyles(ComposedComponent) {
    class StyleAttacher extends Component {
      componentWillMount() {
        this.removeCss = this.props.insertCss(...styles);
      }

      componentWillUnmount() {
        if (this.removeCss) {
          setTimeout(this.removeCss, 0);
        }
      }

      render() {
        return null;
      }
    }

    StyleAttacher.propTypes = {
      insertCss: PropTypes.func.isRequired,
    };

    const displayName = ComposedComponent.displayName || ComposedComponent.name || 'Component';

    const WithStyles = props => (
      <React.Fragment>
        {/* The reason I don't put <InsertCssConsumer> *inside of* <ComposedComponent> */}
        {/* is to avoid this problem: https://github.com/apollographql/react-apollo/issues/1937 */}
        <InsertCssConsumer>
          {insertCss => <StyleAttacher insertCss={insertCss} />}
        </InsertCssConsumer>
        <ComposedComponent {...props} />
      </React.Fragment>
    );

    WithStyles.displayName = `WithStyles(${displayName})`;
    WithStyles.ComposedComponent = ComposedComponent;

    return hoistStatics(WithStyles, ComposedComponent);
  };
}

