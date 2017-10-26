const path = require('path')

const resolveApp = (relativePath) => path.resolve(process.cwd(), relativePath)


module.exports = {
  appHtml: resolveApp('public/index.html'),
  favicon: resolveApp('public/favicon.ico')
}