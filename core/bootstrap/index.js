const Promise = require('bluebird')
const pluginManager = require('../plugin-manager')
const ora = require('ora')
const config = require('../../config')

module.exports = bootstrap

function bootstrap () {
  return new Promise((resolve, reject) => {
    const app = require('../app')
    var spinner = ora('Bootstrapping application (' + config.environment + ')').start()
    var pluginSpinner

    pluginManager
      .install()
      .then(() => {
        pluginSpinner = ora('Bootstrapping plugins').start()

        return pluginManager.bootstrap(app)
      })
      .then(() => {
        pluginSpinner.succeed('Plugins bootstrapped successfully')

        var servers = app.servers
        var started = 0

        var serverSpinner = ora('Starting servers')

        Object.keys(servers).forEach((plugin) => {
          var pluginServers = servers[plugin]

          Object.keys(pluginServers).forEach((server) => {
            var pluginCallback = pluginServers[server]
            var listenSpinner = ora('Starting ' + server + ' (Plugin: ' + plugin + ')')

            pluginCallback()
              .then(() => {
                listenSpinner.succeed('Started ' + server + ' (Plugin: ' + plugin + ')')
              })
              .catch(error => {
                listenSpinner.fail('Failed to start ' + server + ' (Plugin: ' + plugin + ')')
                console.log(error)
              })

            started++
          })
        })


        if (started) {
          serverSpinner.succeed('Started ' + started + ' servers')
          spinner.succeed('Application bootstrapped successfully')
          resolve(app)
        } else {
          serverSpinner.fail('Did not initialize any servers')
          spinner.warn('Application bootstrapped but has nothing to serve')
          reject(new Error('Bootstrap process did not initialize a server'))
        }
      })
      .catch((error) => {
        spinner.fail('Application bootstrapping failed')
        reject(error)
      })
  })
}
