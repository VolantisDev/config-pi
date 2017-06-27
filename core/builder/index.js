var Promise = require('bluebird')
var dependencyChecker = require('../dependency-checker')
var ora = require('ora')
var rmfr = require('rmfr')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../../config')
var webpackConfig = require('../../plugins/webpack/webpack.prod.conf')

module.exports = {
  build: build
}

function runWebpack () {
  return new Promise((resolve, reject) => {
    webpack(webpackConfig, (error, stats) => {
      if (error) reject(error)
      resolve(stats)
    })
  })
}

function build () {
  process.env.NODE_ENV = 'production'
  const spinner = ora('Checking dependencies').start()

  // Ensure dependencies exist at th right versions
  dependencyChecker.check()

  spinner.text = 'Building for production'
  rmfr(path.join(config.build.assetsRoot, config.build.assetsSubDirectory))
    .then(runWebpack)
    .then(stats => {
      spinner.succeed('Finished building for production')

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
    .catch(error => {
      spinner.fail('Failed production build')
      console.error(error)
    })
}
