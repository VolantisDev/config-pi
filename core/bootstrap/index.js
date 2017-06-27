const Promise = require('bluebird')
const pluginManager = require('./plugin-manager')
const ora = require('ora')

module.exports = bootstrap

function bootstrap () {
  return new Promise((resolve, reject) => {
    const spinner = ora('Bootstrapping application').start()

    pluginManager
      .install()
      .then(pluginManager.bootstrap)
      .then((app) => {
        app.on('ready', () => {
          spinner.succeed('Application bootstrapped successfully')
        })

        resolve(app)
      })
      .catch((error) => {
        spinner.fail('Application bootstrapping failed')
        console.error(error)

        reject(error)
      })
  })
}
