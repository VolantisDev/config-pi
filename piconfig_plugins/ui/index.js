const ora = require('ora')

const UiPlugin = module.exports

UiPlugin.name = 'ui'

UiPlugin.requires = ['config']

UiPlugin.init = (app, { config }) => {
  var spinner = ora('Initializing ui plugin')

  if (config.config.environment === 'production') {
    require('./dist/main.js')
  }

  spinner.succeed('Initialized ui plugin')
}
