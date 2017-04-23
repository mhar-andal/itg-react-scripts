const path = require('path');
const fs   = require('fs');
const url  = require('url');

const APP_ROOT = fs.realpathSync(process.cwd());
const APP_SRC  = 'src';

function resolveApp (relativePath) {
  return path.resolve(APP_ROOT, relativePath);
}

function resolveOwn (relativePath) {
  return path.resolve(__dirname, '..', relativePath);
}

const nodePaths = (process.env.NODE_PATH || '')
.split(process.platform === 'win32' ? ';' : ':')
.filter(Boolean)
.filter(folder => !path.isAbsolute(folder))
.map(resolveApp);

module.exports = {
  appRoot        : APP_ROOT,
  appSrc         : resolveApp(APP_SRC),
  appPublic      : resolveApp('public'),
  appHtml        : resolveApp('public/index.html'),
  appIndexJs     : resolveApp(`${APP_SRC}/index.js`),
  appBuild       : resolveApp('build'),
  appPackageJson : resolveApp('package.json'),
  yarnLockFile   : resolveApp('yarn.lock'),

  nodePaths      : nodePaths,
  appNodeModules : resolveApp('node_modules'),
  ownNodeModules : resolveOwn('node_modules'),
};
