import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginPrettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import tsParser from "@typescript-eslint/parser"; // Import the TypeScript parser

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["src/**/*.{jsx}"], // Only lint files in `src`
    ignores: ["node_modules/**", "dist/**"], // Ignore specified directories
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parser: tsParser, // Use the TypeScript parser
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // Enable JSX parsing
        },
      },
    },
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      ...prettierConfig.rules, // Disable conflicting rules with Prettier
      "prettier/prettier": "error", // Show Prettier issues as ESLint errors
    },
    settings: {
      react: {
        version: "detect", // Automatically detect the React version
      },
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];
