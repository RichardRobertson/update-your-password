import globals from "globals";
import eslintRecommended from "@eslint/js";
import prettierRecommended from "eslint-plugin-prettier/recommended";

export default [
    {
        languageOptions: {
            ecmaVersion: 12,
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        ...eslintRecommended.configs.recommended,
        ...prettierRecommended,
    },
];
