/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { JSDOM } from 'jsdom';
import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import insertCss from '../src/insertCss';

const { window } = new JSDOM('<!doctype html><html><body></body></html>');

global.window = window;
global.document = window.document;
global.navigator = window.navigator;

describe('insertCss(styles, options)', () => {
  it('Should insert and remove <style> element', () => {
    const css = 'body { color: red; }';
    const removeCss = insertCss([[1, css]]);
    let style = global.document.getElementById('s1-0');
    expect(style).to.be.ok;
    expect(style.textContent).to.be.equal(css);
    expect(removeCss).is.a('function');
    removeCss();
    style = global.document.getElementById('s1-0');
    expect(style).to.be.null;
  });

  it('Should insert and remove multiple <style> elements for a single module', () => {
    const css1 = 'body { color: red; }';
    const css2 = 'body { color: blue; }';
    const removeCss = insertCss([[1, css1], [1, css2]]);
    let style = global.document.getElementsByTagName('style');
    expect(style.length).to.be.equal(2);
    expect(style[0].textContent).to.be.equal(css1);
    expect(style[1].textContent).to.be.equal(css2);
    expect(removeCss).is.a('function');
    removeCss();
    style = global.document.getElementsByTagName('style');
    expect(style.length).to.be.equal(0);
  });
});

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