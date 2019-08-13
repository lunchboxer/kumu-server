const svelte = require('rollup-plugin-svelte')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const replace = require('rollup-plugin-replace')
const { terser } = require('rollup-plugin-terser')
const postcss = require('rollup-plugin-postcss')
const sass = require('rollup-plugin-sass')
const livereload = require('rollup-plugin-livereload')
const notify = require('rollup-plugin-notify')
require('dotenv').config()

const production = !process.env.ROLLUP_WATCH

module.exports = [{
  input: './src/index.js',
  output: {
    name: 'app',
    format: 'iife',
    sourcemap: true,
    file: 'public/bundle.js'
  },
  plugins: [
    svelte({
      // enable run-time checks when not in production
      dev: !production,
      // we'll extract any component CSS out into
      // a separate file — better for performance
      css: css => {
        css.write('public/bundle.css')
      }
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(production ? 'production' : 'development'),
      'process.env.DEV_API_ENDPOINT': JSON.stringify(process.env.DEV_API_ENDPOINT),
      'process.env.DEV_SUBSCRIPTION_ENDPOINT': JSON.stringify(process.env.DEV_SUBSCRIPTION_ENDPOINT),
      'process.env.PROD_API_ENDPOINT': JSON.stringify(process.env.PROD_API_ENDPOINT),
      'process.env.PROD_SUBSCRIPTION_ENDPOINT': JSON.stringify(process.env.PROD_SUBSCRIPTION_ENDPOINT)
    }),
    postcss({
      extensions: ['.css']
    }),
    resolve({
      browser: true,
      dedupe: importee =>
        importee === 'svelte' || importee.startsWith('svelte/')
    }),
    commonjs(),
    !production && livereload({
      watch: 'public'
    }),
    notify(),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser()
  ],

  watch: {
    clearScreen: false
  }
},
{
  input: 'src/main.scss',
  output: {
    name: 'main',
    format: 'iife',
    dir: 'public'
  },
  plugins: sass({
    output: 'public/main.css'
  })
}
]
