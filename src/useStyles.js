/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { useContext, useLayoutEffect } from 'react'
import StyleContext from './StyleContext'

const isBrowser = typeof window !== 'undefined'

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
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useLayoutEffect(runEffect, [insertCss])
  } else {
    runEffect()
  }
}

export default useStyles
