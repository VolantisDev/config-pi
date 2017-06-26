var Promise = require('bluebird')
var fs = require('fs')
var npm = require('npm-programmatic')
var architect = Promise.promisifyAll(require('architect'))
var plugins = require('./plugins')

var npmOptions = {
  cwd: plugins.pluginsDir,
  save: true
}

module.exports = {
  plugins: plugins,
  bootstrap: bootstrap,
  install: install,
  uninstall: uninstall
}

function bootstrap () {
  return new Promise((resolve, reject) => {
    architect.resolveConfigAsync(plugins.architectPlugins, plugins.pluginsDir)
      .then((architectConfig) => {
        return architect.createAppAsync(architectConfig)
      })
      .then((app) => {
        resolve(app)
      })
      .catch((error) => {
        console.error(error)
        reject(error)
      })
  })
}

function install (plugin) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(plugins.pluginsDir)) {
      fs.mkdirSync(plugins.pluginsDir)
    }

    var installPlugins = plugin ? [plugin] : plugins

    npm.install(installPlugins, npmOptions)
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
