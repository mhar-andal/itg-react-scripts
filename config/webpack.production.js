const webpack          = require('webpack');
const paths            = require('./paths');
const plugins          = require('./webpack/plugins');

const rules            = require('./webpack/rules');
const babelLoaderRules = require('./webpack/rules/babel-loader');

module.exports = {
  devtool: 'source-map',

  devServer: {
    contentBase: paths.appBuild,
    filename: 'static/js/bundle.js',
    publicPath: publicPath,
  },

  entry: [
    paths.appIndexJs,
  ],

  output: {
    path: paths.appBuild,
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    publicPath: publicPath,
  },

  plugins: [
    ...plugins,
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ],

  module: {
    rules: [
      ...rules,
      babelLoaderRules({uglify: true}),
    ],
  },

  resolve: {
    modules: [
      'node_modules',
      paths.appRoot,
      path.resolve(process.cwd(), paths.appRoot)
    ].concat(paths.nodePaths),

    extensions: ['', '.js', '.jsx', '.json']
  },

  resolveLoader: {
    modules: [
      paths.ownNodeModules,
      paths.appNodeModules,
    ],
  },
};
