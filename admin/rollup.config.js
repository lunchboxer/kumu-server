import svelte from 'rollup-plugin-svelte'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'
import postcss from 'rollup-plugin-postcss'
import notify from 'rollup-plugin-notify'
import sass from 'rollup-plugin-sass'
require('dotenv').config()

const production = !process.env.ROLLUP_WATCH

module.exports = [{
  input: 'admin/src/index.js',
  output: {
    name: 'app',
    format: 'iife',
    sourcemap: true,
    file: 'admin/public/bundle.js'
  },
  plugins: [
    svelte({
      // enable run-time checks when not in production
      dev: !production,
      // we'll extract any component CSS out into
      // a separate file — better for performance
      css: css => {
        css.write('admin/public/bundle.css')
      }
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(production ? 'production' : 'development'),
      'process.env.API_ENDPOINT': JSON.stringify(process.env.API_ENDPOINT),
      'process.env.SUBSCRIPTION_ENDPOINT': JSON.stringify(process.env.SUBSCRIPTION_ENDPOINT)
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
      watch: 'admin/public'
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
  input: 'admin/src/main.scss',
  output: {
    name: 'main',
    format: 'iife',
    dir: 'admin/public'
  },
  plugins: sass({
    output: 'admin/public/main.css'
  })
}
]
