const Router = require('koa-router');
const router = new Router();

router.get('/login', async (ctx, next) => {
  ctx.body = {
    status_code: 0,
    msg: 'success'
  };
  next();
})

router.get('/register', async (ctx, next) => {
  ctx.body = {
    status_code: 0,
    msg: 'success'
  };
  next();
})

module.exports = router.routes();