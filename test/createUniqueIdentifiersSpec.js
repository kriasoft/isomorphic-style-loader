/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { expect } from 'chai';
import createUniqueIdentifiers from '../src/createUniqueIdentifiers';

const { describe, it } = global;

describe('createUniqueIdentifiers', () => {
  describe('when all identifiers are unique', () => {
    const identifiers = ['1', '23', '13'];

    it('retains all identifiers', () => {
      expect(createUniqueIdentifiers(identifiers)).to.deep.equal(identifiers);
    });
  });

  describe('when some of the identifiers are non-unique', () => {
    const identifiers = ['0', '12', '12', '23'];

    it('makes non-unique identifiers unique', () => {
      const uniqueIdentifiers = createUniqueIdentifiers(identifiers);
      expect(uniqueIdentifiers[1]).to.not.equal(uniqueIdentifiers[2]);
    });

    it('retains unique identifiers', () => {
      const uniqueIdentifiers = createUniqueIdentifiers(identifiers);
      expect(uniqueIdentifiers[0]).to.equal(identifiers[0]);
      expect(uniqueIdentifiers[3]).to.equal(identifiers[3]);
    });
  });


  describe('when there are multiple groups of non-unique identifiers', () => {
    const identifiers = ['12', '14', '12', '4', '800', '800', '801', '12'];

    it('makes non-unique identifiers unique', () => {
      const uniqueIdentifiers = createUniqueIdentifiers(identifiers);

      expect(uniqueIdentifiers[0]).to.not.equal(uniqueIdentifiers[2]);
      expect(uniqueIdentifiers[0]).to.not.equal(uniqueIdentifiers[7]);
      expect(uniqueIdentifiers[2]).to.not.equal(uniqueIdentifiers[7]);

      expect(uniqueIdentifiers[4]).to.not.equal(uniqueIdentifiers[5]);
    });

    it('retains unique identifiers', () => {
      const uniqueIdentifiers = createUniqueIdentifiers(identifiers);
      expect(uniqueIdentifiers[1]).to.equal(identifiers[1]);
      expect(uniqueIdentifiers[3]).to.equal(identifiers[3]);
      expect(uniqueIdentifiers[6]).to.equal(identifiers[6]);
    });
  });
});
