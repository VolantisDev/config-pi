var path = require('path')
var fs = require('fs')

var defaultPluginsFile = path.resolve(__dirname, '../config/plugins')
var pluginsFile = '/etc/pi-config/plugins'
var pluginsDir = path.resolve(__dirname, '../plugins')

var plugins = fs.readFileSync(defaultPluginsFile).toString().split('\n')
if (fs.existsSync(pluginsFile)) {
  plugins.merge(fs.readFileSync(pluginsFile).toString().split('\n'))
}

var architectPlugins = []
for (var index in plugins) {
  architectPlugins.push(path.resolve(pluginsDir, plugins[index]))
}

module.exports = {
  plugins: plugins,
  architectPlugins: architectPlugins,
  pluginsDir: pluginsDir
}
