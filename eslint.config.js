import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import daStyle from "eslint-config-dicodingacademy";

export default tseslint.config(
  { ignores: ["dist", "**/*.d.ts"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, daStyle],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "linebreak-style": ["error", "windows"],
      quotes: ["error", "double", { allowTemplateLiterals: true }],
    },
  },
);
