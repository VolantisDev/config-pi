const Promise = require('bluebird')
const pluginManager = require('../plugin-manager')
const ora = require('ora')
const App = require('broadway')
const config = require('../../config')

module.exports = bootstrap

function bootstrap () {
  return new Promise((resolve, reject) => {
    const spinner = ora('Bootstrapping application (' + config.environment + ')').start()
    const app = new App()

    pluginManager
      .install()
      .then(() => {
        return pluginManager.bootstrap(app)
      })
      .then(() => {
        app.init(error => {
          if (error) reject(error)
          app.listen()
          spinner.succeed('Application bootstrapped successfully')
          resolve(app)
        })
      })
      .catch((error) => {
        spinner.fail('Application bootstrapping failed')
        console.error(error)

        reject(error)
      })
  })
}
