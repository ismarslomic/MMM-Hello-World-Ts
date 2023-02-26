import typescript from '@rollup/plugin-typescript'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'
import pkg from './package.json' assert { type: 'json' }

// Banner to be placed at the top of the compiled files
const bannerText = `/*! *****************************************************************************
  ${pkg.name}
  Version ${pkg.version}

  ${pkg.description}
  Please submit bugs at ${pkg.bugs.url}

  (c) ${pkg.author ? pkg.author : pkg.contributors}
  Licence: ${pkg.license}

  This file is auto-generated. Do not edit.
***************************************************************************** */`
export default [
  {
    input: './src/frontend/Frontend.ts',
    external: ['logger'],
    plugins: [typescript({ module: 'ESNext' }), nodeResolve(), commonjs(), terser()],
    output: {
      file: './' + pkg.main,
      format: 'umd',
      banner: bannerText,
      sourcemap: true,
      globals: {
        logger: 'Log',
      },
    },
  },
  {
    input: './src/backend/Backend.ts',
    external: ['node_helper', 'logger'],
    plugins: [typescript({ module: 'ESNext' }), nodeResolve(), terser()],
    output: {
      file: './node_helper.js',
      format: 'cjs',
      banner: bannerText,
      sourcemap: true,
    },
  },
]
