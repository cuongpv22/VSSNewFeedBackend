const Router = require("koa-router")
const router = new Router()
const posts = require('./posts')

router.use("/posts", posts)

module.exports = router.routes()