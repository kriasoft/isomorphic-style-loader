/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import createUniqueIdentifiers from '../src/createUniqueIdentifiers'

describe('createUniqueIdentifiers(identifiers)', () => {
  it('Should retain identifiers that are already unique', () => {
    const identifiers = ['1', '23', '13']
    expect(createUniqueIdentifiers(identifiers)).toEqual(identifiers)
  })

  it('Should make non-unique identifiers unique', () => {
    const identifiers = ['0', '12', '12', '23']
    const uniqueIdentifiers = createUniqueIdentifiers(identifiers)
    expect(uniqueIdentifiers[1]).not.toBe(uniqueIdentifiers[2])
    expect(uniqueIdentifiers[0]).toBe(identifiers[0])
    expect(uniqueIdentifiers[3]).toBe(identifiers[3])
  })

  it('Should handle multiple groups of non-unique identifiers', () => {
    const identifiers = ['12', '14', '12', '4', '800', '800', '801', '12']
    const uniqueIdentifiers = createUniqueIdentifiers(identifiers)

    expect(uniqueIdentifiers[0]).not.toBe(uniqueIdentifiers[2])
    expect(uniqueIdentifiers[0]).not.toBe(uniqueIdentifiers[7])
    expect(uniqueIdentifiers[2]).not.toBe(uniqueIdentifiers[7])
    expect(uniqueIdentifiers[4]).not.toBe(uniqueIdentifiers[5])

    expect(uniqueIdentifiers[1]).toBe(identifiers[1])
    expect(uniqueIdentifiers[3]).toBe(identifiers[3])
    expect(uniqueIdentifiers[6]).toBe(identifiers[6])
  })
})
