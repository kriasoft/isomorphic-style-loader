/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

const fs = require('fs-extra')
const path = require('path')
const rollup = require('rollup')
const { babel } = require('@rollup/plugin-babel')

// The source files to be compiled by Rollup
const files = [
  {
    input: 'dist/src/index.js',
    output: 'dist/index.js',
    format: 'cjs',
  },
  {
    input: 'dist/src/withStyles.js',
    output: 'dist/withStyles.js',
    format: 'cjs',
    external: ['react', path.resolve('dist/src/StyleContext.js')],
    paths: { [path.resolve('dist/src/StyleContext.js')]: './StyleContext.js' },
  },
  {
    input: 'dist/src/useStyles.js',
    output: 'dist/useStyles.js',
    format: 'cjs',
    external: ['react', path.resolve('dist/src/StyleContext.js')],
    paths: { [path.resolve('dist/src/StyleContext.js')]: './StyleContext.js' },
  },
  {
    input: 'dist/src/StyleContext.js',
    output: 'dist/StyleContext.js',
    format: 'cjs',
    external: ['react'],
  },
  {
    input: 'dist/src/insertCss.js',
    output: 'dist/insertCss.js',
    format: 'cjs',
  },
]

async function build() {
  // Clean up the output directory
  await fs.emptyDir('dist')

  // Copy source code
  await fs.copy('src', 'dist/src')

  // Compile source code into a distributable format with Babel
  await Promise.all(
    files.map(async (file) => {
      const bundle = await rollup.rollup({
        input: file.input,
        external: file.external,
        plugins: [
          babel({
            babelHelpers: 'bundled',
            babelrc: false,
            presets: [
              '@babel/preset-react',
              [
                '@babel/preset-env',
                {
                  modules: false,
                  loose: true,
                },
              ],
            ],
            comments: false,
          }),
        ],
      })

      await bundle.write({
        file: file.output,
        format: file.format,
        interop: 'default',
        sourcemap: true,
        banner:
          '/*! Isomorphic Style Loader' +
          ' | MIT License' +
          ' | https://github.com/kriasoft/isomorphic-style-loader */\n',
        paths: file.paths,
      })
    }),
  )
}

module.exports = build()
