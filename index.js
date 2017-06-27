require('babel-polyfill')
var bootstrap = require('./core/bootstrap')
bootstrap()
  .catch(error => {
    console.log(error)
    return process.exit(1)
  })
