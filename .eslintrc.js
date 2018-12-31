module.exports = {
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "parserOptions": {
    sourceType: 'module',
    ecmaVersion: 9
  },
  "extends": "airbnb-base",
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [
          ".js",
          ".mjs"
        ]
      }
    }
  },
  "globals": {
    DOMException: false,
    URL: false,
  },
  "rules": {
    "no-restricted-syntax": ["error", "ForInStatement", "LabeledStatement", "WithStatement"]
  }
};