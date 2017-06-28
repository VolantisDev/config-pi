var Promise = require('bluebird')
var npm = require('npm-programmatic')
var userPlugins = require('./user-plugins')
var plugins = require('./plugins')
var shell = require('shelljs')
var ora = require('ora')
var tennuPlugins = require('tennu-plugins')

var pluginsDir = '/usr/lib/pi-config/piconfig_plugins'

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
    try {
      var servers = {}
      var pluginManager = tennuPlugins('piconfig', app)
      pluginManager.addHook('servers', function (plugin, listenCallbacks) {
        servers[plugin] = listenCallbacks
      })

      app.pluginManager = pluginManager
      app.servers = servers

      for (var i in plugins) {
        var plugin = plugins[i]
        pluginManager.use([plugin.name], plugin.path)
      }

      resolve(app)
    } catch (e) {
      reject(e)
    }
  })
}

function install (plugin) {
  return new Promise((resolve, reject) => {
    var installPlugins = plugin ? [plugin] : userPlugins

    if (installPlugins.length > 0) {
      var spinner = ora('Installing plugins: [' + installPlugins.join(', ') + ']').start()

      shell.mkdir('-p', pluginsDir)
      npm.install(installPlugins, npmOptions)
        .then(() => {
          spinner.succeed('Plugins installed')
          resolve()
        })
        .catch((error) => {
          spinner.fail('Problem installing plugins')
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

    var spinner = ora('Uninstalling plugin ' + plugin).start()

    npm.uninstall(uninstallPlugins, npmOptions)
      .then(() => {
        spinner.succeed('Plugin ' + plugin + ' uninstalled')
        resolve()
      })
      .catch((error) => {
        spinner.fail('Plugin ' + plugin + ' not uninstalled')
        reject(error)
      })
  })
}
