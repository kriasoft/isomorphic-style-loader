/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

const jest = require('jest')

const jestConfig = {
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  testMatch: ['**/*.test.js'],
}

async function test() {
  await jest.run(['--config', JSON.stringify(jestConfig), ...process.argv.slice(2)])
}

module.exports = module.parent ? test : test().catch(process.exit)
