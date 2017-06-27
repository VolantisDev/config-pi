const ConfigPlugin = exports

ConfigPlugin.name = 'Config'

ConfigPlugin.init = (app) => {
  app.bootstrap.pluginSpinner.text = 'Attaching config plugin'

  return {
    exports: {
      config: require('../../config')
    }
  }
}
