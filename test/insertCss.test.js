/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import insertCss from '../src/insertCss'

describe('insertCss(styles, options)', () => {
  it('Should insert and remove <style> element', () => {
    const css = 'body { color: red; }'
    const removeCss = insertCss([[1, css]])
    let style = global.document.getElementById('s1-0')
    expect(style).toBeDefined()
    expect(style.textContent).toBe(css)
    expect(removeCss).toBeDefined()
    removeCss()
    style = global.document.getElementById('s1-0')
    expect(style).toBeNull
  })

  it('Should insert and remove multiple <style> elements for a single module', () => {
    const css1 = 'body { color: red; }'
    const css2 = 'body { color: blue; }'
    const removeCss = insertCss([[1, css1], [1, css2]])
    let style = global.document.getElementsByTagName('style')
    expect(style).toHaveLength(2)
    expect(style[0].textContent).toBe(css1)
    expect(style[1].textContent).toBe(css2)
    expect(removeCss).toBeDefined()
    removeCss()
    style = global.document.getElementsByTagName('style')
    expect(style).toHaveLength(0)
  })
})
