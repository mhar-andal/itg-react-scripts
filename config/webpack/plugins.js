const webpack = require('webpack');

const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

module.exports = [
  new CaseSensitivePathsPlugin(),
  // new webpack.DefinePlugin({
  //   CONFIG: JSON.stringify(environmentConfig)
  // }),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
];
