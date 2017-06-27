// This module converts the main plugin list into an Architect plugin config object
var path = require('path')
var plugins = require('./plugins')

var corePluginsDir = path.resolve(__dirname, '../plugins')
var pluginsDir = '/usr/lib/pi-config/plugins'

var architectPlugins = []
for (var index in plugins) {
  var plugin = plugins[index]

  var basePath = (plugin.type === 'core') ? corePluginsDir : pluginsDir

  architectPlugins.push(path.resolve(basePath, plugin.name))
}

module.exports = architectPlugins
