const UiPlugin = module.exports

UiPlugin.name = 'ui'

UiPlugin.requires = ['Config']

UiPlugin.init = (app, { Config }) => {
  app.bootstrap.pluginSpinner.text = 'Attaching ui plugin'

  if (Config.config.environment === 'production') {
    require('./dist/main.js')
  }
}
