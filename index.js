const Koa = require('koa')
const session = require('koa-session')
const hbs = require('koa-hbs')
const static = require('koa-static')
const path = require('path')

const router = require('./lib/router')

const port = process.env.PORT || 3215
const debug = process.env.NODE_ENV !== 'production'

// koa settings
const app = new Koa()

app.use(hbs.middleware({
  viewPath: path.join(__dirname, 'views')
}))

// router settings
router(app)

if(debug) {
  const koaWebpack = require('koa-webpack')
  app.use(koaWebpack())
} else {
  app.use(static('views'))
}

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}/`)
})
