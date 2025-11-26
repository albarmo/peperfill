/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
    project: "./tsconfig.json",
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        moduleDirectory: ["node_modules", "app/"],
      },
      typescript: {},
    },
    react: {
      version: "detect",
    },
  },
  env: {
    browser: true,
    node: true,
    es2022: true,
  },
  plugins: [
    "react",
    "react-hooks",
    "@typescript-eslint",
    "import",
    "jsx-a11y",
    "tailwindcss",
  ],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/recommended",
    "plugin:tailwindcss/recommended",
    "prettier", 
  ],
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "import/no-unresolved": "off",
    "react/react-in-jsx-scope": "off", 
    "react/prop-types": "off", 
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "tailwindcss/no-custom-classname": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
  },
  ignorePatterns: [
    "node_modules/",
    "build/",
    "dist/",
    ".cache/",
    "*.config.*",
  ],
};
