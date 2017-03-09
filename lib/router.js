const route = require('koa-route')
const passport = require('koa-passport')

const index = require('./routes/index')

module.exports = app => {
  app.use(route.get('/', index.get))
}