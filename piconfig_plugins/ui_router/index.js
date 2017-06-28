const ora = require('ora')

const UiRouterPlugin = module.exports

UiRouterPlugin.name = 'ui_router'

UiRouterPlugin.requires = ['config']

UiRouterPlugin.init = (app, { config }) => {
  var spinner = ora('Initializing ui_router plugin')

  // routes = {name: { parents, route }}
  var routes = {}

  var plugin = {
    exports: {
      routes: routes
    },
    hooks: {
      routes (pluginName, pluginRoutes) {
        pluginRoutes.forEach((routeConfig, routeName) => {
          routes[routeName] = routeConfig
        })
      }
    }
  }

  app.routes = routes

  spinner.succeed('Initialized ui_router plugin')

  return plugin
}
