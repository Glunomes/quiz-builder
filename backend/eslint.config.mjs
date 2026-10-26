// eslint.config.mjs
import eslint from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";

export default defineConfig(
  globalIgnores([
    "dist/**",
    "node_modules/**",
    "generated/**",
    "prisma/**",
    "prisma.config.ts",
    "eslint.config.mjs",
  ]),
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
    },
  },
  prettier,
);
