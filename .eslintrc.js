module.exports = {
  extends: 'airbnb',
  rules: {
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
    "arrow-parens": ["error", "always"],
    "no-console": ["error", {allow: ["log", "warn", "error"]}],
    "no-plusplus": "off",
  },
  env: {
    browser: true,
    jest: true,
    node: true,
  },
};