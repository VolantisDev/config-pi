const Promise = require('bluebird')
const pluginManager = require('./plugin-manager')
const ora = require('ora')
const broadway = require('broadway')

module.exports = bootstrap

function bootstrap () {
  return new Promise((resolve, reject) => {
    const spinner = ora('Bootstrapping application').start()

    const app = new broadway.App()

    pluginManager
      .install(app)
      .then(() => {
        return pluginManager.bootstrap()
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
