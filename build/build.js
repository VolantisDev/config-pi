var Promise = require('bluebird')
var checkVersions = require('./check-versions')
var ora = require('ora')
var rm = require('rimraf-promise')
var path = require('path')
var chalk = require('chalk')
var webpack = Promise.promisify(require('webpack'))
var config = require('../core/config')
var webpackConfig = require('./webpack.prod.conf')

process.env.NODE_ENV = 'production'
checkVersions()

var spinner = ora('Building for production...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory))
  .then(() => {
    return webpack(webpackConfig)
  })
  .then((stats) => {
    spinner.stop()

    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
  .catch((error) => {
    throw error
  })
