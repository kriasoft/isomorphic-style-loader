/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { useContext, useEffect } from 'react'
import StyleContext from './StyleContext'

// To detect if it's in SSR process or in browser. Wrapping with
// the function makes rollup's replacement of "this" avoidable
// eslint-disable-next-line func-names
const isBrowser = (function() {
  return this && typeof this.window === 'object'
})()

function useStyles(...styles) {
  const { insertCss } = useContext(StyleContext)
  if (!insertCss) throw new Error('Please provide "insertCss" function by StyleContext.Provider')
  const runEffect = () => {
    const removeCss = insertCss(...styles)
    return () => {
      setTimeout(removeCss, 0)
    }
  }
  if (isBrowser) {
    useEffect(runEffect, [])
  } else {
    runEffect()
  }
}

export default useStyles
