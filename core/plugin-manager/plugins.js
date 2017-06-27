var path = require('path')
var fs = require('fs')
var userPlugins = require('./user-plugins')

var defaultPluginsFile = path.resolve(__dirname, '../../config/plugins')
var plugins = []
var index

var pluginsArray = fs.readFileSync(defaultPluginsFile).toString().split('\n')
for (index in pluginsArray) {
  plugins.push({
    name: pluginsArray[index],
    type: 'core'
  })
}

for (index in userPlugins) {
  plugins.push({
    name: userPlugins[index],
    type: 'user'
  })
}

module.exports = plugins
