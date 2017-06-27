var Promise = require('bluebird')
var npm = require('npm-programmatic')
var userPlugins = require('./user-plugins')
var plugins = require('./plugins')
var shell = require('shelljs')

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

      app.mixin(require(plugin.path))
    }
  })
}

function install (plugin) {
  return new Promise((resolve, reject) => {
    var installPlugins = plugin ? [plugin] : userPlugins

    if (installPlugins.length > 0) {
      shell.mkdir('-p', pluginsDir)
      npm.install(installPlugins, npmOptions)
        .then(() => {
          console.log('SUCCESS: Required plugins are installed')
          resolve()
        })
        .catch((error) => {
          console.log(error)
          reject(error)
        })
    } else {
      resolve()
    }
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
