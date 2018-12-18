const config = require('config')
const bunyan = require('bunyan')

module.exports = bunyan.createLogger({
  name: 'track-api-doc-server',
  level: 'error',
  streams: [
    {
      level: 'info',
      stream: process.stdout
    },
    {
      level: 'error',
      path: config.get('logDir')
    }
  ]
})
