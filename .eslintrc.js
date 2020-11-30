module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    "react-native/react-native": true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "react-native"],
  rules: {},
  settings: {
    "import/resolver": {
      "babel-module": {},
    },
    react: {
      version: "detect",
    },
  },
};
