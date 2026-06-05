/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/**
 * Make a list of module identifiers unique by appending a counter
 * to duplicates, e.g. ['1', '2', '2'] => ['1', '2', '2_1'].
 */
function createUniqueIdentifiers(identifiers) {
  const dupeCount = Object.create(null)

  return identifiers.map((identifier) => {
    if (typeof dupeCount[identifier] !== 'undefined') {
      dupeCount[identifier] += 1
    } else {
      dupeCount[identifier] = 0
    }

    return dupeCount[identifier] === 0 ? `${identifier}` : `${identifier}_${dupeCount[identifier]}`
  })
}

export default createUniqueIdentifiers
