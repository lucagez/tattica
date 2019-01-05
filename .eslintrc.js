module.exports = {
  "env": {
    "browser": true,
    "node": true,
    "es6": true,
    "mocha": true,
  },
  "parserOptions": {
    sourceType: 'module',
    ecmaVersion: 9
  },
  "extends": "airbnb-base",
  "settings": {
    "import/resolver": {
      "breowser": {
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
    browser: true,
    expect: true,
    tattica: true,
  },
  "rules": {
    "no-restricted-syntax": ["error", "ForInStatement", "LabeledStatement", "WithStatement"],
    "max-len": ["error", 130, 2, {
          ignoreUrls: true,
          ignoreComments: false,
          ignoreRegExpLiterals: true,
          ignoreStrings: false,
          ignoreTemplateLiterals: false,
        }],
  }
};