/** @type {import('eslint').Linter.Config} */
const config = {
  extends: ["plugin:@next/next/recommended"],
  parserOptions: {},
  rules: {
    "@next/next/no-html-link-for-pages": "off",
  },
  plugins: ["unused-imports"],
};

module.exports = config;
