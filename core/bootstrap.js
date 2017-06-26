var pluginManager = require('./plugin-manager')

pluginManager
  .install()
  .then(() => {
    return pluginManager.bootstrap()
  })
  .then((app) => {
    app.on('ready', () => {
      console.log('> Application started successfully')

      require('./main')(app)
    })
  })
  .catch((error) => {
    console.error('> ERROR: Could not start application')
    console.log(error)
  })
