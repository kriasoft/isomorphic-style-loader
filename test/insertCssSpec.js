import { describe, it } from 'mocha';
import { expect } from 'chai';
import insertCss from '../src/insertCss';

describe('insertCss(styles, options)', () => {
  it('Should insert and remove <style> element', () => {
    const css = 'body { color: red; }';
    const removeCss = insertCss([[1, css]]);
    let style = global.document.getElementById('s1-0');
    expect(style).to.be.ok;
    expect(style.textContent).to.be.equal(css);
    expect(removeCss).to.be.func;
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
    expect(removeCss).to.be.func;
    removeCss();
    style = global.document.getElementsByTagName('style');
    expect(style.length).to.be.equal(0);
  });
});
