var Promise = require('bluebird')
var path = require('path')
var ora = require('ora')

var ServiceManagerPlugin = module.exports

ServiceManagerPlugin.name = 'service_manager'

ServiceManagerPlugin.requires = ['systemd']

ServiceManagerPlugin.init = (app, { systemd }) => {
  var spinner = ora('Initializing service_manager plugin')

  var installDir = path.resolve(__dirname, '../')

  var services = {
    'pi-config': {
      description: 'Pi Config API',
      author: 'Ben McClure <ben.mcclure@gmail.com>',
      cwd: installDir,
      script: installDir + '/server.js'
    }
  }

  var plugin = {
    exports: {
      install: install,
      installAll: () => {
        return installAll(app)
      },
      services: services
    },
    hooks: {
      services (pluginName, pluginServices) {
        pluginServices.forEach((service, serviceName) => {
          services[serviceName] = service
        })
      }
    }
  }

  function install (name, config) {
    return new Promise((resolve, reject) => {
      var spinner = ora('Installing ' + name + ' service').start()

      systemd.add(name, config)
        .then(() => {
          spinner.succeed('Installed ' + name + ' service')
          resolve()
        })
        .catch((error) => {
          spinner.fail('Failed to install ' + name + ' service')
          reject(error)
        })
    })
  }

  function installAll (app) {
    return new Promise((resolve, reject) => {
      var spinner = ora('Installing all services').start()

      services.forEach((service, serviceName) => {
        install(serviceName, service)
      })

      spinner.succeed('Finished installing services')
    })
  }

  spinner.succeed('Initialized service_manager plugin')

  return plugin
}
