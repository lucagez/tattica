const path = require('path');

module.exports = {
  entry: path.join(__dirname, '/src/_withBlocks/tattica.js'),
  output: {
    path: path.join(__dirname, '/dist/'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: ['/node_modules/'],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env'],
            },
          },
        ],
      },
    ],
  },
};
