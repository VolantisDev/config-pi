const Promise = require('bluebird')
const pluginManager = require('../plugin-manager')
const ora = require('ora')
const config = require('../../config')

module.exports = bootstrap

function bootstrap () {
  return new Promise((resolve, reject) => {
    const app = {}
    app.bootstrap = {}
    app.bootstrap.spinner = ora('Bootstrapping application (' + config.environment + ')').start()

    pluginManager
      .install()
      .then(() => {
        app.bootstrap.pluginSpinner = ora('Bootstrapping plugins')

        return pluginManager.bootstrap(app)
      })
      .then(() => {
        var ServerPlugin = app.pluginManager.getPlugin('Server')

        app.bootstrap.pluginSpinner.succeed('Plugins bootstrapped successfully')

        var listenSpinner = ora('Starting listen server')
        if (ServerPlugin.listen) {
          ServerPlugin.listen()
          listenSpinner.succeed('Started listen server')
          app.bootstrap.spinner.succeed('Application bootstrapped successfully')
        } else {
          listenSpinner.warn('No listen server found')
          app.bootstrap.spinner.warn('Application bootstrapped but did not start a server')
        }

        resolve(app)
      })
      .catch((error) => {
        app.bootstrap.spinner.fail('Application bootstrapping failed')
        reject(error)
      })
  })
}
