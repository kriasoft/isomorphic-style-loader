/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react'
import PropTypes from 'prop-types'
import hoistStatics from 'hoist-non-react-statics'

import StyleContext from './StyleContext'

function withStyles(...styles) {
  return function wrapWithStyles(ComposedComponent) {
    class WithStyles extends React.PureComponent {
      constructor(props, context) {
        super(props, context)
        this.removeCss = context.insertCss(...styles)
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

    WithStyles.propTypes = {
      __$$withStylesRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({
          current: PropTypes.instanceOf(typeof Element === 'undefined' ? Function : Element),
        }),
      ]),
    }

    WithStyles.defaultProps = {
      __$$withStylesRef: undefined,
    }

    WithStyles.contextType = StyleContext

    const ForwardedWithStyles = React.forwardRef((props, ref) => (
      <WithStyles {...props} __$$withStylesRef={ref} />
    ))

    ForwardedWithStyles.ComposedComponent = ComposedComponent
    ForwardedWithStyles.displayName = `WithStyles(${displayName})`

    return hoistStatics(ForwardedWithStyles, ComposedComponent)
  }
}

export default withStyles
