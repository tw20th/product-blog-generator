module.exports = {
  root: true,
  env: {
    es6: true,
    node: true
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "google",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended", // ← 追加
    "prettier" // ← 最後に追加することで競合解消
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json"],
    sourceType: "module"
  },
  ignorePatterns: ["/lib/**/*", "/generated/**/*", ".eslintrc.js"],
  plugins: [
    "@typescript-eslint",
    "import",
    "prettier" // ← 追加
  ],
  rules: {
    "prettier/prettier": "error", // ← PrettierのルールもESLintエラーとして扱う
    quotes: ["error", "double"],
    "import/no-unresolved": 0,
    indent: ["error", 2],
    "require-jsdoc": "off" // 👈 JSDoc 警告を無効化
  }
};
