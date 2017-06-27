var path = require('path')
var fs = require('fs')
var userPlugins = require('./user-plugins')

var pluginsDir = '/usr/lib/pi-config/plugins'
var defaultPluginsFile = path.resolve(__dirname, '../../config/plugins')
var plugins = []
var index
var plugin

var pluginsArray = fs.readFileSync(defaultPluginsFile).toString().split('\n')
pluginsArray = pluginsArray.filter(n => { return n })
for (index in pluginsArray) {
  plugin = pluginsArray[index]

  plugins.push({
    name: plugin,
    type: 'core',
    path: path.resolve(__dirname, '../../plugins', plugin)
  })
}

for (index in userPlugins) {
  plugin = userPlugins[index]

  if (plugin) {
    plugins.push({
      name: plugin,
      type: 'user',
      path: path.resolve(pluginsDir, plugin)
    })
  }
}

module.exports = plugins
