module.exports = {
  extends: 'airbnb-base',
  rules: {
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
    "arrow-parens": ["error", "always"],
    "no-console": ["error", {allow: ["log", "warn", "error"]}],
    "no-plusplus": "off",
  },
  env: {
    browser: true,
    node: true,
  },
};