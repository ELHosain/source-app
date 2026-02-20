import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        node: "readonly",
        commonjs: "readonly",
        jest: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        describe: "readonly",
        it: "readonly",
        expect: "readonly"
      }
    },
    rules: {
      indent: ["error", 2],
      "linebreak-style": ["error", "unix"],
      quotes: ["error", "single"],
      semi: ["error", "always"],
      "no-console": "off",
      "no-undef": "off"
    }
  }
];
