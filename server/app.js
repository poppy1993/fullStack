const Koa = require("koa");
const bodyParser = require('koa-bodyparser');
const router = require('./routes/index');
const mongoose = require('mongoose');

// 创建一个Koa对象表示web app本身:
const app = new Koa();

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

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
});

app
  .use(router.routes())  //作用：启动路由
  .use(router.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

// 在端口3001监听:
app.listen(3001);
