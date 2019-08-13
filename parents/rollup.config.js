const svelte = require('rollup-plugin-svelte')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const replace = require('rollup-plugin-replace')
const { terser } = require('rollup-plugin-terser')
const postcss = require('rollup-plugin-postcss')
const livereload = require('rollup-plugin-livereload')
const notify = require('rollup-plugin-notify')

const production = !process.env.ROLLUP_WATCH

export default {
  input: './src/main.js',
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
    postcss({
      extensions: ['.css']
    }),
    resolve({
      browser: true,
      dedupe: importee =>
        importee === 'svelte' || importee.startsWith('svelte/')
    }),
    commonjs(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
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
}
