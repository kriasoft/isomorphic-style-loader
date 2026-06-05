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
    let style = global.document.getElementById('s1')
    expect(style).toBeDefined()
    expect(style.textContent).toBe(css)
    expect(removeCss).toBeDefined()
    removeCss()
    style = global.document.getElementById('s1')
    expect(style).toBeNull()
  })

  it('Should insert and remove multiple <style> elements for a single module', () => {
    const css1 = 'body { color: red; }'
    const css2 = 'body { color: blue; }'
    const removeCss = insertCss([
      [1, css1],
      [1, css2],
    ])
    let style = global.document.getElementsByTagName('style')
    expect(style).toHaveLength(2)
    expect(style[0].textContent).toBe(css1)
    expect(style[1].textContent).toBe(css2)
    expect(removeCss).toBeDefined()
    removeCss()
    style = global.document.getElementsByTagName('style')
    expect(style).toHaveLength(0)
  })

  it('Should reuse the <style> element of a module regardless of its position', () => {
    const css = 'body { color: green; }'
    const removeCss1 = insertCss([[2, css]])
    const removeCss2 = insertCss([
      [3, 'body { margin: 0; }'],
      [2, css],
    ])
    const style = global.document.getElementsByTagName('style')
    expect(style).toHaveLength(2)
    removeCss1()
    removeCss2()
    expect(global.document.getElementsByTagName('style')).toHaveLength(0)
  })

  it('Should make the returned remove function idempotent', () => {
    const css = 'body { color: red; }'
    const removeCss1 = insertCss([[10, css]])
    const removeCss2 = insertCss([[10, css]])
    removeCss1()
    removeCss1()
    expect(global.document.getElementById('s10')).not.toBeNull()
    removeCss2()
    expect(global.document.getElementById('s10')).toBeNull()
  })

  it('Should not lose subsequent inserts after the count reaches zero', () => {
    const css = 'body { color: red; }'
    insertCss([[11, css]])()
    expect(global.document.getElementById('s11')).toBeNull()
    const removeCss = insertCss([[11, css]])
    expect(global.document.getElementById('s11')).not.toBeNull()
    removeCss()
    expect(global.document.getElementById('s11')).toBeNull()
  })

  it('Should preserve the reference count when replacing styles', () => {
    const removeCss1 = insertCss([[12, 'body { color: red; }']])
    const removeCss2 = insertCss([[12, 'body { color: red; }']])
    const removeReplaced = insertCss([[12, 'body { color: blue; }']], { replace: true })
    expect(global.document.getElementById('s12').textContent).toBe('body { color: blue; }')
    removeReplaced()
    expect(global.document.getElementById('s12')).not.toBeNull()
    removeCss1()
    expect(global.document.getElementById('s12')).not.toBeNull()
    removeCss2()
    expect(global.document.getElementById('s12')).toBeNull()
  })
})
