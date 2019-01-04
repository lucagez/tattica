const rimraf = require('rimraf');
const process = require('process');
const path = require('path');

const buildPath = path.join(__dirname, '/dist/');
rimraf.sync(buildPath);

module.exports = {
  entry: path.join(__dirname, '/src/tattica.js'),
  output: {
    path: buildPath,
    filename: 'tattica.js',
  },
  devtool: process.env.DEV ? 'source-map' : 'none',
};
