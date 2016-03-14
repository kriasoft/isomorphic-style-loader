import { describe, it } from 'mocha';
import { expect } from 'chai';
import React, { createClass, Component } from 'react';
import withStyles from '../src/withStyles';

describe('withStyles(ComposedComponent, ...styles)', () => {
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

    const decorated = withStyles('')(Container);
    expect(decorated.ComposedComponent).to.equal(Container);
  });
});
