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
const babel = require('rollup-plugin-babel')
const { uglify } = require('rollup-plugin-uglify')
const commonjs = require('rollup-plugin-commonjs')
const nodeResolve = require('rollup-plugin-node-resolve')
const pkg = require('../package.json')

// The source files to be compiled by Rollup
const files = [
  {
    input: 'dist/src/index.js',
    output: 'dist/index.js',
    format: 'cjs',
    external: ['loader-utils'],
  },
  {
    input: 'dist/src/withStyles.js',
    output: 'dist/withStyles.js',
    format: 'cjs',
    external: ['react', 'hoist-non-react-statics', path.resolve('dist/src/StyleContext.js')],
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

  // Copy source code, readme and license
  await Promise.all([
    fs.copy('src', 'dist/src'),
    fs.copy('README.md', 'dist/README.md'),
    fs.copy('LICENSE.txt', 'dist/LICENSE.txt'),
  ])

  // Compile source code into a distributable format with Babel
  await Promise.all(
    files.map(async (file) => {
      const bundle = await rollup.rollup({
        input: file.input,
        external: file.external,
        plugins: [
          ...(file.format === 'umd' ? [nodeResolve({ browser: true }), commonjs()] : []),
          babel({
            babelrc: false,
            presets: [
              '@babel/preset-react',
              [
                '@babel/preset-env',
                {
                  modules: false,
                  loose: true,
                  useBuiltIns: 'entry',
                },
              ],
            ],
            comments: false,
          }),
          ...(file.output.endsWith('.min.js') ? [uglify({ output: { comments: '/^!/' } })] : []),
        ],
      })

      bundle.write({
        file: file.output,
        format: file.format,
        interop: false,
        sourcemap: true,
        name: file.name,
        banner:
          '/*! Isomorphic Style Loader' +
          ' | MIT License' +
          ' | https://github.com/kriasoft/isomorphic-style-loader */\n',
        globals: file.globals,
        paths: file.paths,
      })
    }),
  )

  // Create package.json for npm publishing
  const libPkg = { ...pkg, main: 'index.js' }
  delete libPkg.private
  delete libPkg.devDependencies
  delete libPkg.scripts
  await fs.outputJson('dist/package.json', libPkg, { spaces: 2 })
}

module.exports = build()
