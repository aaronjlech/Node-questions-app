var path = require('path');

var config = {
  context: path.join(__dirname, 'src'),
  entry: [
    './main.js',
  ],
  devtool: 'eval',

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel'],
     },
     {
     test: /\.scss$/,
     loaders: ["style-loader", "css-loader", "sass-loader"]
   }
    ],
  },

  resolveLoader: {
    root: [
      path.join(__dirname, 'node_modules'),
    ],
  },
  resolve: {
    root: [
      path.join(__dirname, 'node_modules'),
    ],
  },
};
module.exports = config;
