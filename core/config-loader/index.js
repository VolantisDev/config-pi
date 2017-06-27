import path from 'path'
import fs from 'fs'
import flatconfig from 'flatconfig'

export function loadConfig (configPath) {
  configPath = configPath || path.resolve(__dirname, '../config')
  return flatconfig.load(configPath)
}

export function mergeIni (config, iniPath) {
  iniPath = iniPath || '/etc/pi-config/config'
  if (fs.existsSync(iniPath)) {
    flatconfig.join.ini(config, iniPath)
  }
}
