// eslint.config.js
module.exports = [
  {
    files: ["*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        // Node.js globals
        module: "readonly",
        require: "readonly",
        console: "readonly",
        process: "readonly",
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
      "prettier/prettier": "error",
    },
    "extends": ["eslint:recommended", "prettier", "airbnb-base"]
  },
];
