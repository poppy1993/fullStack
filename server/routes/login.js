const Router = require('koa-router');
const router = new Router();

router.get('/login', async (ctx, next) => {
  const query = ctx.request.query;
  console.log('query', query);
  ctx.body = {
    status_code: 0,
    msg: 'success'
  };
  next();
})

router.post('/register', async (ctx, next) => {
  const postData = ctx.request.body;
  console.log('postData', postData);
  ctx.body = {
    status_code: 0,
    msg: 'success'
  };
  next();
})

module.exports = router.routes();