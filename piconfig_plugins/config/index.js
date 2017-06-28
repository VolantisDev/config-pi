const ora = require('ora')
const ConfigPlugin = exports

ConfigPlugin.name = 'config'

ConfigPlugin.init = (app) => {
  var spinner = ora('Initializing config plugin')

  var plugin = {
    exports: {
      config: require('../../config')
    }
  }

  spinner.succeed('Initialized config plugin')

  return plugin
}
