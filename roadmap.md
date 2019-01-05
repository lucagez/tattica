# Tattica

- STATUS: working
- COMPLETION: 80%
- MAIN MISSING: docs and readme

TODO:
[x] moved to Webpack
[x] add waitIntersections in main
[x] transfer _withBlocks in main part
[x] divide modules in lib/
[x] pass navigator.connection.effectivetype to loader
    - ad props in loader => load effectivetype relative to 'connectionValue'
[x] decide between browsersync and http-server
[x] arrived at loader in transforming everything to object (easier to mantain)
[x] add timestamp feature
[x] set up mocha and puppeteer testing
[x] update `npm run build:dev` in package.json => no webpack
[x] Moved back to microbundle => This library doesn't need all webpack power
[x] Added CI linting in Travis  

[ ] polish tests (grouping functions, refactoring...)
[ ] add tests for connection.js
[ ] add test for `loadSingle` callback
[ ] add demos
    [ ] dummy - at least 1
    [ ] real world - at least 2
    [ ] finish `Carousel - test`
