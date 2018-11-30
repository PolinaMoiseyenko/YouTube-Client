const path = require('path');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack-config.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.join(__dirname, '..'),
      verbose: true,
      dry: false,
    })
  ],
});
