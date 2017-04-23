const webpack                       = require('webpack');
const union                         = require('lodash').union;
const path                          = require('path');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');

const paths                         = require('./paths');
const plugins                       = require('./webpack/plugins');

const rules                         = require('./webpack/rules');
const babelLoaderRules              = require('./webpack/rules/babel-loader');

const BABEL_LOADER_PLUGINS_DEV = [
  require.resolve('babel-plugin-transform-react-jsx-self'),
  require.resolve('babel-plugin-transform-react-jsx-source'),
  require.resolve('react-hot-loader/babel'),
];

const publicPath = '/';
const publicUrl = '';

module.exports = {
  devtool: 'eval-source-map',

  devServer: {
    contentBase: paths.appBuild,
    filename: 'static/js/bundle.js',
    hot: true,
    publicPath: publicPath,
  },

  entry: [
    require.resolve('react-hot-loader/patch'),
    require.resolve('react-dev-utils/webpackHotDevClient'),
    paths.appIndexJs,
  ],

  output: {
    path: paths.appBuild,
    pathinfo: true,
    filename: 'static/js/bundle.js',
    publicPath: publicPath,
  },

  plugins: union(
    plugins,
    [
      new webpack.HotModuleReplacementPlugin(),
      new WatchMissingNodeModulesPlugin(paths.appNodeModules),
      new WatchMissingNodeModulesPlugin(paths.ownNodeModules),
      new webpack.NamedModulesPlugin(),
    ]
  ),

  module: {
    rules: [
      ...rules,
      babelLoaderRules({
        uglify: true,
        additionalPlugins: BABEL_LOADER_PLUGINS_DEV,
      }),
    ],
  },

  resolve: {
    modules: [
      'node_modules',
      paths.appRoot,
      path.resolve(process.cwd(), paths.appRoot)
    ].concat(paths.nodePaths),

    extensions: ['.js', '.jsx', '.json']
  },

  resolveLoader: {
    modules: [
      paths.ownNodeModules,
      paths.appNodeModules,
    ],
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  performance: {
    hints: false,
  },
};
