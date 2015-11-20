/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

const inserted = {};
const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

module.exports = function(styles, options) {
  if (inserted[styles.id]) {
    return;
  }

  inserted[styles] = true;

  const elem = document.createElement('style');
  elem.setAttribute('type', 'text/css');

  if ('textContent' in elem) {
    elem.textContent = styles.toString();
  } else {
    elem.styleSheet.cssText = styles.toString();
  }

  if (options && options.prepend) {
    document.head.insertBefore(elem, document.head.childNodes[0]);
  } else {
    document.head.appendChild(elem);
  }
};
