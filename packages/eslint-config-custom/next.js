/** @type {import('eslint').Linter.Config} */
const config = {
  extends: ["plugin:@next/next/recommended"],
  parserOptions: ["tsconfig.json"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
  },
};

module.exports = config;
