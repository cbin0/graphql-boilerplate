const fs             = require('fs')
const express        = require('express')
const logger         = require('./lib/logger')
const Sequelize      = require('sequelize')
const {
  GraphQLServer
} = require('graphql-yoga')

const sequelize = new Sequelize('sqlite:db/apidoc.db')
const models = {}
const port = process.env.PORT || 8080

// init models
fs.readdirSync(__dirname + '/models').forEach(function(x) {
  let reg = /\.js$/
  if(reg.test(x)) {
    let model = require(`./models/${x}`)
    if(model.call) {
      models[
        x.replace(reg, '')
        .replace(/-(\w)?/, (x, l) => l ? l.toUpperCase() : '')
      ] = model.call(this, sequelize)
    }
  }
})

// init relations
require('./relations')(models)

// init schema
const schema = require('./schema')(models)

// init server
const server = new GraphQLServer({
  // typeDefs: './schema.graphql',
  // resolvers,
  schema,
  context: req => ({
    ...req,
    db: sequelize
  })
})

// start the server
server.start({
  port,
  endpoint: '/graphql',
  playground: '/playground'
}, (options) => {
  logger.info('api start on port ' + port)
  console.log('options:', options)
})

const app = server.express

// init routes
const router = express.Router()
// test route to make sure everything is working
router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' })
})
fs.readdirSync(__dirname + '/routes').forEach(function(x) {
  if(/\.js$/.test(x)) require(`./routes/${x}`)(router, sequelize, models)
})
app.use('/api', router)

// redirect
app.use('/', (req, res, next) => {
  res.redirect('/api')
})

// error handler
app.use((err, req, res, next) => {
  logger.error(`error: ${err.message},${err.stack}`)
  res.status(500).send(`${err.stack}`)
})
