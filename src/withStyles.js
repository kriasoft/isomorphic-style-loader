/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react'
import hoistStatics from 'hoist-non-react-statics'

import StyleContext from './StyleContext'

function withStyles(...styles) {
  return function wrapWithStyles(ComposedComponent) {
    class WithStyles extends React.PureComponent {
      constructor(props, context) {
        super(props, context)
        this.markServerDuplicatedStyles();
        this.removeCss = context.insertCss(...styles)
      }

      componentWillUnmount() {
        if (this.removeCss) {
          setTimeout(this.removeCss, 0)
        }
      }

      markServerDuplicatedStyles() {
        const { isServer, css } = this.context;
        if (!isServer) { return; }

        styles.forEach(style => {
          if(css.has(style._getCss())) {
            style.isDuplicate = true;
          } else {
            style.isDuplicate = false;
          }
        });
      }

      renderStyles() {
        const { isServer } = this.context;
        if (!isServer) { return null; }
        if (isServer
          && styles.every(style => style.isDuplicate)
        ) { return null; }
        return (
          <style type="text/css">
            { styles.map(style => style.isDuplicate ?
            '' : style._getCss()
            )}
          </style>
        );
      }

      render() {
        return (
          <React.Fragment>
            { this.renderStyles() }
            <ComposedComponent {...this.props} />
          </React.Fragment>
        )
      }
    }

    const displayName = ComposedComponent.displayName || ComposedComponent.name || 'Component'

    WithStyles.displayName = `WithStyles(${displayName})`
    WithStyles.contextType = StyleContext
    WithStyles.ComposedComponent = ComposedComponent

    return hoistStatics(WithStyles, ComposedComponent)
  }
}

export default withStyles
