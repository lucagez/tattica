const path = require('path');

module.exports = {
  entry: path.join(__dirname, '/src/_withBlocks/tattica.js'),
  output: {
    path: path.join(__dirname, '/dist/'),
  },
  devtool: 'source-map',
};
