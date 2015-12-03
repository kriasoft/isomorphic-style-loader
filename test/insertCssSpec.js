import jsdom from 'jsdom';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import insertCss from '../src/insertCss';

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.parentWindow;

describe('insetCss(styles, options)', () => {
  it('Should insert and remove <style> element', () => {
    const css = 'body { color: red; }';
    const removeCss = insertCss([[1, css]]);
    let style = global.document.getElementById('s1');
    expect(style).to.be.ok;
    expect(style.textContent).to.be.equal(css);
    expect(removeCss).to.be.func;
    removeCss();
    style = global.document.getElementById('s1');
    expect(style).to.be.null;
  });
});
