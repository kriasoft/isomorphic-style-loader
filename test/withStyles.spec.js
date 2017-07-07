/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { JSDOM } from 'jsdom';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import React, { Component, Children } from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import withStyles from '../src/withStyles';

const { window } = new JSDOM('<!doctype html><html><body></body></html>');

global.window = window;
global.document = window.document;
global.navigator = window.navigator;

describe('withStyles(...styles)(WrappedComponent)', () => {
  it('Should call insetCss and removeCss functions provided by context', (done) => {
    class Provider extends Component {
      getChildContext() {
        return { insertCss: this.props.insertCss };
      }

      render() {
        return Children.only(this.props.children);
      }
    }

    Provider.propTypes = {
      insertCss: PropTypes.func.isRequired,
      children: PropTypes.node.isRequired,
    };

    Provider.childContextTypes = {
      insertCss: PropTypes.func.isRequired,
    };

    class Foo extends Component {
      render() {
        return <div />;
      }
    }

    const FooWithStyles = withStyles('')(Foo);
    const insertCss = sinon.spy(() => done);
    const container = document.createElement('div');

    ReactDOM.render(
      <Provider insertCss={insertCss}>
        <FooWithStyles />
      </Provider>,
      container,
    );
    ReactDOM.unmountComponentAtNode(container);
    expect(insertCss.calledOnce).to.be.true;
  });

  it('Should set the displayName correctly', () => {
    expect(withStyles('')(
      class Foo extends Component {
        render() {
          return <div />;
        }
      },
    ).displayName).to.equal('WithStyles(Foo)');

    expect(withStyles('')(
      createClass({
        displayName: 'Bar',
        render() {
          return <div />;
        },
      }),
    ).displayName).to.equal('WithStyles(Bar)');

    expect(withStyles('')(
      createClass({
        render() {
          return <div />;
        },
      }),
    ).displayName).to.be.oneOf(['WithStyles(Component)', 'WithStyles(Constructor)']);
  });

  it('Should expose the component with styles as ComposedComponent', () => {
    class Container extends Component {
      render() {
        return <div />;
      }
    }

    const decorated = withStyles('')(Container);
    expect(decorated.ComposedComponent).to.equal(Container);
  });

  it('Hoists non-react statics of the composed component', () => {
    class Foo extends Component {
      render() {
        return <div />;
      }
    }
    Foo.someStaticProperty = true;

    const decorated = withStyles('')(Foo);
    expect(decorated.someStaticProperty).to.equal(true);
  });

  it('Does not hoist react statics of the composed component', () => {
    class Foo extends Component {
      render() {
        return <div />;
      }
    }
    Foo.propTypes = true;

    const decorated = withStyles('')(Foo);
    expect(decorated.propTypes).to.not.equal(true);
  });
});
