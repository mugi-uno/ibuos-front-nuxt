module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'typescript-eslint-parser',
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'typescript',
    'plugin:vue/essential',
    "plugin:prettier/recommended"
  ],
  // required to lint *.vue files
  plugins: [
    'vue',
    'prettier'
  ],
  // add your custom rules here
  rules: {
    'typescript/no-var-requires': false,
    'typescript/no-non-null-assertion': false,
    'typescript/explicit-function-return-type': false,
    'typescript/no-angle-bracket-type-assertion': false
  }
}
