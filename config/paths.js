import path from 'path';
import fs   from 'fs';
import url  from 'url';

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
  appRoot  : APP_ROOT,
  appRoot  : APP_SRC,
  appPublic: resolveApp('public'),
  appHtml  : resolveApp('public/index.html'),
  appIndexJs: resolveApp(`${APP_SRC}/index.js`),
  appBuild : resolveApp('build'),
  nodePaths: nodePaths,

  appNodeModules: resolveApp('node_modules'),
  ownNodeModules: resolveOwn('node_modules'),
};
