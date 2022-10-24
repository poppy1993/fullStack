const Koa = require("koa");
const session = require('koa-session');
const bodyParser = require('koa-bodyparser');
const router = require('./routes/index');

// 创建一个Koa对象表示web app本身:
const app = new Koa();

app.keys = ['some secret hurr'];

const CONFIG = {
  key: 'koa.sess',
  maxAge: 86400000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
  // secure: true, /** (boolean) secure cookie*/
  sameSite: null, /** (string) session cookie sameSite options (default null, don't set it) */
};

app.use(session(CONFIG, app));

app.use(bodyParser());

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  // let n = ctx.session.views || 0;
  // ctx.session.views = ++n;
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
