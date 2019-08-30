import svelte from 'rollup-plugin-svelte'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'
import postcss from 'rollup-plugin-postcss'
import notify from 'rollup-plugin-notify'
import json from 'rollup-plugin-json'
require('dotenv').config()

const production = !process.env.ROLLUP_WATCH

export default {
  input: 'parents/src/main.js',
  output: {
    name: 'app',
    format: 'iife',
    sourcemap: true,
    file: 'parents/public/bundle.js'
  },
  plugins: [
    svelte({
      // enable run-time checks when not in production
      dev: !production,
      // we'll extract any component CSS out into
      // a separate file — better for performance
      css: css => {
        css.write('parents/public/bundle.css')
      }
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(production ? 'production' : 'development'),
      'process.env.API_ENDPOINT': JSON.stringify(process.env.API_ENDPOINT)
    }),
    postcss({
      extensions: ['.css']
    }),
    json({
      preferConst: true,
      compact: true
    }),
    resolve({
      browser: true,
      dedupe: importee =>
        importee === 'svelte' || importee.startsWith('svelte/')
    }),
    commonjs(),
    !production && livereload({
      watch: 'parents/public'
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
