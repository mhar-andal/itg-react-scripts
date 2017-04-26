const paths = require('../paths');

module.exports = [
  { parser: { requireEnsure: false } },
  {
    test: /\.jsx?$/,
    enforce: 'pre',
    include: paths.appSrc,
    use: [
      {
        loader: 'eslint-loader',
        options: {
          baseConfig: {
            extends: ['adorable'],
          },
          useEslintrc: false,
        }
      }
    ]
  }
];
