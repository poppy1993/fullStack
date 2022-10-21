// const Koa = require('koa')
// const app = new Koa()
// const views = require('koa-views')
// const json = require('koa-json')
// const onerror = require('koa-onerror')
// const bodyparser = require('koa-bodyparser')
// const logger = require('koa-logger')

// const index = require('./routes/index')
// const users = require('./routes/users')

// // error handler
// onerror(app)

// // middlewares
// app.use(bodyparser({
//   enableTypes:['json', 'form', 'text']
// }))
// app.use(json())
// app.use(logger())
// app.use(require('koa-static')(__dirname + '/public'))

// app.use(views(__dirname + '/views', {
//   extension: 'pug'
// }))

// // logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// // routes
// app.use(index.routes(), index.allowedMethods())
// app.use(users.routes(), users.allowedMethods())

// // error-handling
// app.on('error', (err, ctx) => {
//   console.error('server error', err, ctx)
// });

// module.exports = app

// 导入koa2
const Koa = require("koa");
const bodyParser = require('koa-bodyparser');
const router = require('./routes/index');
const mongoose = require('mongoose');

// 创建一个Koa对象表示web app本身:
const app = new Koa();

// 对于任何请求，app将调用该异步函数处理请求：
// app.use(async (ctx, next) => {
//   await next();
//   ctx.response.type ='text/html';
//   ctx.response.body ="<h1>Hello, koa2!</h1>";
// });

const MONGODBURL = 'mongodb+srv://AlbertBird:qwerasdf@cluster0.wttcowf.mongodb.net/test';
mongoose.connect(MONGODBURL);
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error)
});

database.once('connected', () => {
  console.log('Database Connected');
});

app.use(bodyParser());

app
  .use(router.routes())  //作用：启动路由
  .use(router.allowedMethods());
// 在端口3001监听:
app.listen(3001);
