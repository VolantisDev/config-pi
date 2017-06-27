var Promise = require('bluebird')
var npm = require('npm-programmatic')
var userPlugins = require('./user-plugins')
var plugins = require('./plugins')
var shell = Promise.promisifyAll(require('shelljs'))

var pluginsDir = '/usr/lib/pi-config/plugins'

var npmOptions = {
  cwd: pluginsDir,
  save: true
}

module.exports = {
  plugins: plugins,
  bootstrap: bootstrap,
  install: install,
  uninstall: uninstall
}

function bootstrap (app) {
  return new Promise((resolve, reject) => {
    for (var i in plugins) {
      var plugin = plugins[i]
      app.use(require(plugin.path))
    }
  })
}

function install (plugin) {
  return new Promise((resolve, reject) => {
    var installPlugins = plugin ? [plugin] : userPlugins

    shell.mkdirAsync('-p', pluginsDir)
      .then(() => {
        return npm.install(installPlugins, npmOptions)
      })
      .then(() => {
        console.log('SUCCESS: Required plugins are installed')
        resolve()
      })
      .catch((error) => {
        console.log(error)
        reject(error)
      })
  })
}

function uninstall (plugin) {
  return new Promise((resolve, reject) => {
    var uninstallPlugins = [plugin]

    npm.uninstall(uninstallPlugins, npmOptions)
      .then(() => {
        console.log('SUCCESS: Required plugins are uninstalled')
        resolve()
      })
      .catch((error) => {
        console.log(error)
        reject(error)
      })
  })
}
