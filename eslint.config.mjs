import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"], // Make sure .js files are covered
    languageOptions: {
      globals: globals.browser
    },
    rules: {
      "react/react-in-jsx-scope": "off", // Disable the rule globally
    }
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];
