const Router = require('koa-router');
const connection = require('../models/db');
const router = new Router();

router.post('/login', async (ctx, next) => {
  const body = ctx.request.body;
  const { password, email } = body;
  // 查询email是否存在
  console.log('body', body, ctx.session);
  try {
    const querySql = `SELECT * FROM user_info_test WHERE user_email='${email}'`;
    const [res] = await connection.query(querySql);
    console.log('res1', res);
    if (!res?.length) {
      ctx.body = {
        code: 2002,
        message: '用户不存在'
      };
    } else if (res[0]?.password !== password) {
      ctx.body = {
        code: 2003,
        message: '密码不正确'
      };
    } else {
      ctx.body = {
        code: 0,
        message: '登陆成功'
      };
      ctx.session.email = email;
    }
  } catch (error) {
    ctx.body = {
      message: error.message
    };
  }
})

router.post('/register', async (ctx, next) => {
  const body = ctx.request.body;
  const { password, email } = body;
  console.log('body', body);
  try {
    const querySql = `SELECT * FROM user_info_test WHERE user_email='${email}'`;
    const [res] = await connection.query(querySql);
    console.log('res1', res);
    if (res?.length > 0) {
      ctx.body = {
        code: 2001,
        message: '用户已注册'
      };
    } else {
      const addSql = `INSERT INTO user_info_test  (user_email, password) VALUES ('${email}', '${password}');`;
      console.log('addSql', addSql);
      const res = await connection.query(addSql);
      console.log('addSql', res);
      ctx.body = {
        code: 0,
        message: '注册成功'
      };
    }
  } catch (error) {
    ctx.body = {
      message: error.message
    };
  }
})

module.exports = router.routes();