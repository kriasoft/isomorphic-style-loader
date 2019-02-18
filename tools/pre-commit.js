/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

const lint = require('./lint')
const test = require('./test')

async function preCommit() {
  await lint()
  await test()
}

module.exports = preCommit().catch(process.exit)
