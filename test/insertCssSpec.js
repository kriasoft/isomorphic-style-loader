/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import jsdom from 'jsdom';
import { expect } from 'chai';
import insertCss from '../src/insertCss';

const { describe, it, beforeEach } = global;

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.parentWindow;

const css1 = 'body { color: red; }';
const css2 = 'body { color: blue; }';

function getStyleTags() {
  return global.document.getElementsByTagName('style');
}

describe('insertCss(styles, options)', () => {
  beforeEach(() => {
    insertCss._clearCache();
    const styles = global.document.getElementsByTagName('style');
    for (const style of styles) {
      style.parentElement.removeChild(style);
    }
  });

  it('inserts a style element', () => {
    insertCss([[1, css1]]);
    const styleTags = getStyleTags();
    expect(styleTags[0].textContent).to.equal(css1);
  });

  it('returns a function that removes the style element', () => {
    const removeCss = insertCss([[1, css1]]);
    expect(removeCss).to.be.a('function');
    removeCss();
    const styleTags = getStyleTags();
    expect(styleTags.length).to.equal(0);
  });

  describe('when a module is added a second time', () => {
    it('does nothing', () => {
      insertCss([[1, css1]]);
      insertCss([[1, css2]]);
      const styleTags = getStyleTags();
      expect(styleTags.length).to.equal(1);
      expect(styleTags[0].textContent).to.equal(css1);
    });

    describe('and options.replace is set to true', () => {
      it('replaces the first module', () => {
        insertCss([[1, css1]]);
        insertCss([[1, css2]], { replace: true });
        const styleTags = getStyleTags();
        expect(styleTags.length).to.equal(1);
        expect(styleTags[0].textContent).to.equal(css2);
      });
    });
  });

  describe('when a module is imported from multiple places', () => {
    it('only inserts it once', () => {
      insertCss([[2, css1]]);
      insertCss([[1, css1], [2, css2]]);
      expect(getStyleTags().length).to.equal(2);
    });
  });
});
