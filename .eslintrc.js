module.exports = {
  extends: 'airbnb-base',
  parser: "babel-eslint",

  rules: {
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
    "arrow-parens": ["error", "always"],
    "no-console": ["error", {allow: ["log", "warn", "error"]}],
    "no-plusplus": "off",
    "no-unused-vars": "off",
    "object-curly-newline": "off",
  },
  env: {
    browser: true,
    node: true,
  },
};