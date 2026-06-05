/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react'

import StyleContext from './StyleContext'

const isBrowser = typeof window !== 'undefined'

function withStyles(...styles) {
  return function wrapWithStyles(ComposedComponent) {
    class WithStyles extends React.PureComponent {
      constructor(props, context) {
        super(props, context)
        if (!isBrowser) {
          context.insertCss(...styles)
        }
      }

      componentDidMount() {
        this.removeCss = this.context.insertCss(...styles)
      }

      componentWillUnmount() {
        if (typeof this.removeCss === 'function') {
          setTimeout(this.removeCss, 0)
        }
      }

      render() {
        const { __$$withStylesRef, ...props } = this.props
        return <ComposedComponent ref={__$$withStylesRef} {...props} />
      }
    }

    const displayName = ComposedComponent.displayName || ComposedComponent.name || 'Component'

    WithStyles.contextType = StyleContext

    const ForwardedWithStyles = React.forwardRef((props, ref) => (
      <WithStyles {...props} __$$withStylesRef={ref} />
    ))

    ForwardedWithStyles.ComposedComponent = ComposedComponent
    ForwardedWithStyles.displayName = `WithStyles(${displayName})`

    return ForwardedWithStyles
  }
}

export default withStyles
