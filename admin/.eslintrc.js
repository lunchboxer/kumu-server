module.exports = {
  extends: ['standard', 'plugin:unicorn/recommended'],
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module'
  },
  env: {
    es6: true,
    browser: true
  },
  plugins: ['svelte3'],
  overrides: [
    {
      files: ['**/*.svelte'],
      processor: 'svelte3/svelte3'
    }
  ],
  rules: {
    'unicorn/filename-case': 0,
    'import/first': 0
  },
  env: {
    browser: true
  }
}
