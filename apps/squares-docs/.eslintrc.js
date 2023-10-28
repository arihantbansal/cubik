module.exports = {
  ...require('@cubik/presets/eslint/eslint-preset'),
  root: true,
  extends: ['plugin:tailwindcss/recommended', 'next/core-web-vitals'],

  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
};
