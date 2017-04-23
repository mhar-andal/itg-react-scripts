import webpack from 'webpack';

import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';

module.exports = [
  new CaseSensitivePathsPlugin(),
  // new webpack.DefinePlugin({
  //   CONFIG: JSON.stringify(environmentConfig)
  // }),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
];
