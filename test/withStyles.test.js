/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, act } from 'react'
import { createRoot } from 'react-dom/client'
import withStyles from '../src/withStyles'

import StyleContext from '../src/StyleContext'

describe('withStyles(...styles)(WrappedComponent)', () => {
  it('Should call insertCss and removeCss functions provided by context', (done) => {
    class Foo extends Component {
      render() {
        return <div />
      }
    }

    const FooWithStyles = withStyles('')(Foo)
    const insertCss = jest.fn(() => done)
    const context = { insertCss }
    const container = global.document.createElement('div')

    const root = createRoot(container)
    act(() => {
      root.render(
        <StyleContext.Provider value={context}>
          <FooWithStyles />
        </StyleContext.Provider>,
      )
    })
    act(() => {
      root.unmount()
    })
    expect(insertCss).toHaveBeenCalledTimes(1)
  })

  it('Should pair every insertCss call with exactly one removeCss call in StrictMode', () => {
    jest.useFakeTimers()
    try {
      class Foo extends Component {
        render() {
          return <div />
        }
      }

      const FooWithStyles = withStyles('')(Foo)
      const removers = []
      const insertCss = jest.fn(() => {
        const removeCss = jest.fn()
        removers.push(removeCss)
        return removeCss
      })
      const container = global.document.createElement('div')

      const root = createRoot(container)
      act(() => {
        root.render(
          <React.StrictMode>
            <StyleContext.Provider value={{ insertCss }}>
              <FooWithStyles />
            </StyleContext.Provider>
          </React.StrictMode>,
        )
      })
      act(() => {
        jest.runAllTimers()
      })
      act(() => {
        root.unmount()
      })
      act(() => {
        jest.runAllTimers()
      })

      expect(insertCss).toHaveBeenCalled()
      removers.forEach((removeCss) => {
        expect(removeCss).toHaveBeenCalledTimes(1)
      })
    } finally {
      jest.useRealTimers()
    }
  })

  it('Should set the displayName correctly', () => {
    expect(
      withStyles('')(
        class Foo extends Component {
          render() {
            return <div />
          }
        },
      ).displayName,
    ).toBe('WithStyles(Foo)')

    function Foo() {
      return <div />
    }
    Foo.displayName = 'Bar'
    expect(withStyles('')(Foo).displayName).toBe('WithStyles(Bar)')

    const AnonymousComponent = [() => <div />][0]
    expect(withStyles('')(AnonymousComponent).displayName).toBe('WithStyles(Component)')
  })

  it('Should expose the component with styles as ComposedComponent', () => {
    class Container extends Component {
      render() {
        return <div />
      }
    }

    const decorated = withStyles('')(Container)
    expect(decorated.ComposedComponent).toBe(Container)
  })
})
