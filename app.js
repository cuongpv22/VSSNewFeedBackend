const Koa = require('koa')
const routes = require('./routes')
const app = new Koa()

app.use(routes)

app.use(ctx => {
  ctx.body = 'Hello Koa'
})

app.listen(3000)