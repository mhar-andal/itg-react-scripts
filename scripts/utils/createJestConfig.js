'use strict';

const fs = require('fs');
const paths = require('../../config/paths');

module.exports = (resolve, rootDir) => {

  const setupTestsFile = fs.existsSync(paths.testsSetup)
    ? `<rootDir>/${paths.appRoot}/setupTests.js`
    : undefined;

  const config = {
    collectCoverageFrom: [`${paths.appRoot}/**/*.{js,jsx}`],
    setupTestFrameworkScriptFile: setupTestsFile,
    testPathIgnorePatterns: [
      '<rootDir>[/](build|docs|node_modules|scripts)[/]',
    ],
    testURL: 'http://localhost',
    transform: {
      '^.+\\.jsx?$': resolve('config/jest/babelTransform.js'),
      '^.+\\.css$': resolve('config/jest/cssTransform.js'),
      '^(?!.*\\.(js|jsx|css|json)$)': resolve('config/jest/fileTransform.js'),
    },
    moduleNameMapper: {
      '^react-native$': 'react-native-web',
    },
  };

  if (rootDir) config.rootDir = rootDir;

  return config;
};
