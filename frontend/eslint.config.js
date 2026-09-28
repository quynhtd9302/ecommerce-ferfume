// Replaces the ESLint setup that react-scripts (Create React App) used to provide
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import globals from "globals";

export default tseslint.config(
    { ignores: ["build", "coverage", "node_modules"] },
    {
        files: ["src/**/*.{ts,tsx}"],
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        languageOptions: {
            ecmaVersion: 2020,
            globals: { ...globals.browser, ...globals.node }
        },
        plugins: {
            "react-hooks": reactHooks,
            "jsx-a11y": jsxA11y
        },
        rules: {
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",
            "jsx-a11y/alt-text": "warn",
            "jsx-a11y/anchor-has-content": "warn",
            "jsx-a11y/anchor-is-valid": "warn",
            "@typescript-eslint/consistent-type-assertions": "warn",
            "@typescript-eslint/no-unused-vars": ["warn", { args: "none", ignoreRestSiblings: true }],
            // The code base predates these stricter defaults of typescript-eslint
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
            "@typescript-eslint/ban-ts-comment": "off",
            "@typescript-eslint/no-empty-object-type": "off"
        }
    },
    {
        files: ["src/**/__tests__/**", "src/utils/test/**", "src/setupTests.ts"],
        languageOptions: { globals: { ...globals.vitest } }
    }
);
