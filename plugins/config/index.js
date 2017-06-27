const config = require('../../config')

const ConfigPlugin = exports

ConfigPlugin.name = 'config'

ConfigPlugin.attach = options => {
  const app = this

  app.config = config
}

ConfigPlugin.init = done => {
  done()
}
