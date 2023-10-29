module.exports = {
  bracketSpacing: true,
  bracketSameLine: true,
  singleQuote: false,
  jsxSingleQuote: false,
  trailingComma: 'es5',
  semi: true,
  printWidth: 110,
  arrowParens: 'always',
  endOfLine: 'auto',
  importOrder: [
    // Mocks must be at the top as they contain vi.mock calls
    '(.*)/__mocks__/(.*)',
    '<THIRD_PARTY_MODULES>',
    '^@(cubik|ee)/(.*)$',
    '^@lib/(.*)$',
    '^@components/(.*)$',
    '^@(server|trpc)/(.*)$',
    '^~/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
  overrides: [
    {
      options: {
        quoteProps: 'consistent',
      },
    },
  ],
};
