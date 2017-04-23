import paths from '../paths';

module.exports = function ({uglify, additionalPlugins, babelPresetEnvTargets}) {
  return {
    test: /\.(js|jsx)$/,
    include: paths.appSrc,
    exclude: /node_modules/,

    use: [{
      loader: 'babel-loader',

      options: {
        babelrc: false,
        cacheDirectory: true,

        presets: [
          [
            require.resolve('babel-preset-env'),
            {
              targets: {
                ie: 9,
                uglify: uglify,
                ...babelPresetEnvTargets,
              },
              useBuiltIns: false,
              modules: false,
            },
          ],
          require.resolve('babel-preset-react'),
        ],

        plugins: [
          require.resolve('babel-plugin-dynamic-import-node'),
          require.resolve('babel-plugin-syntax-dynamic-import'),
          require.resolve('babel-plugin-transform-runtime'),
          require.resolve('babel-plugin-transform-class-properties'),
          [ require.resolve('babel-plugin-transform-object-rest-spread'), { useBuiltIns: true, }, ],
          [ require.resolve('babel-plugin-transform-react-jsx'), { useBuiltIns: true, }, ],
          [
            require.resolve('babel-plugin-transform-runtime'),
            {
              helpers: false,
              polyfill: false,
              regenerator: true,
              // Resolve the Babel runtime relative to the config.
              // TODO: WHAT is this?!
              moduleName: path.dirname(require.resolve('babel-runtime/package')),
            },
          ],
          ...additionalPlugins
        ],

      }
    }]
  };
};
