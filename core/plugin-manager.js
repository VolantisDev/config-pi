var Promise = require('bluebird')
var npm = require('npm-programmatic')
var architect = Promise.promisifyAll(require('architect'))
var plugins = require('./plugins')
var shell = Promise.promisifyAll(require('shelljs'))

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
      .then(architect.createAppAsync)
      .then(resolve) // Return app object
      .catch(reject) // Reject with error object
  })
}

function install (plugin) {
  return new Promise((resolve, reject) => {
    var installPlugins = plugin ? [plugin] : plugins

    shell.mkdirAsync('-p', plugins.pluginsDir)
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
