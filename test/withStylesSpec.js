import { describe, it } from 'mocha';
import { expect } from 'chai';
import React, { createClass, Component, PropTypes } from 'react';
import TestUtils from 'react-addons-test-utils';
import withStyles from '../src/withStyles';

describe('withStyles(...styles)(ComposedComponent)', () => {
  class Provider extends Component {
    static childContextTypes = {
      insertCss: PropTypes.func.isRequired,
    };
    getChildContext() {
      return { insertCss() {} };
    }
    render() {
      return <div {...this.props} />;
    }
  }

  class Passthrough extends Component {
    render() {
      return <div {...this.props} />;
    }
  }

  it('Should set the displayName correctly', () => {
    expect(withStyles('')(
      class Foo extends Component {
        render() {
          return <div />;
        }
      }
    ).displayName).to.equal('WithStyles(Foo)');

    expect(withStyles('')(
      createClass({
        displayName: 'Bar',
        render() {
          return <div />;
        },
      })
    ).displayName).to.equal('WithStyles(Bar)');

    expect(withStyles('')(
      createClass({
        render() {
          return <div />;
        },
      })
    ).displayName).to.equal('WithStyles(Component)');
  });

  it('Should expose the component with styles as ComposedComponent', () => {
    class Container extends Component {
      render() {
        return <Passthrough />;
      }
    }

    const Decorated = withStyles('')(Container);
    expect(Decorated.ComposedComponent).to.equal(Container);
  });

  it('Should return the instance of the composed component for use in calling child methods', () => {
    const someData = { some: 'data' };

    class Container extends Component {
      someInstanceMethod() {
        return someData;
      }

      render() {
        return <Passthrough />;
      }
    }

    const Decorated = withStyles('')(Container);

    const tree = TestUtils.renderIntoDocument(
      <Provider>
        <Decorated />
      </Provider>
    );

    const decorated = TestUtils.findRenderedComponentWithType(tree, Decorated);

    expect(() => decorated.someInstanceMethod()).to.throw(Error);
    expect(decorated.getComposedInstance().someInstanceMethod()).to.equal(someData);
    expect(decorated.refs.composedInstance.someInstanceMethod()).to.equal(someData);
  });
});
