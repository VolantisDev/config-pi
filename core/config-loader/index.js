var path = require('path')
var fs = require('fs')
var flatconfig = require('flatconfig')

module.exports = {
  loadConfig: loadConfig,
  mergeIni: mergeIni
}

function loadConfig (configPath) {
  configPath = configPath || path.resolve(__dirname, '../config')
  return flatconfig.load(configPath)
}

function mergeIni (config, iniPath) {
  iniPath = iniPath || '/etc/pi-config/config'
  if (fs.existsSync(iniPath)) {
    flatconfig.join.ini(config, iniPath)
  }
}
