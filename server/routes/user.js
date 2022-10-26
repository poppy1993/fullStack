const Router = require('koa-router');
const connection = require('../models/db');
const router = new Router();

// 注册
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
      }
    }
  } catch (error) {
    ctx.body = {
      message: error.message
    };
  }
})

// 登陆
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

// 重置密码
router.post('/reset', async (ctx, next) => {
  const body = ctx.request.body;
  const { password, email } = body;
  console.log('body', body);
  try {
    const querySql = `SELECT * FROM user_info_test WHERE user_email='${email}'`;
    const [res] = await connection.query(querySql);
    console.log('res1', res);
    if (!res?.length) {
      ctx.body = {
        code: 2002,
        message: '用户不存在'
      };
    } else {
      const updateSql = `Update user_info_test SET password='${password}' WHERE user_email='${email}'`;
      const res = await connection.query(updateSql);
      console.log('addSql', res);
      ctx.body = {
        code: 0,
        message: '修改密码成功'
      }
    }
  } catch (error) {
    ctx.body = {
      message: error.message
    };
  }
})

// 获取个人信息
router.get('/get', async (ctx, next) => {
  const { email } = ctx.session;
  if (!email) {
    ctx.body = {
      code: 3000,
      message: '用户未登录'
    };
  } else {
    try {
      const querySql = `SELECT * FROM user_info_test WHERE user_email='${email}'`;
      const [res] = await connection.query(querySql);
      console.log('res1', res);
      if (!res?.length) {
        ctx.body = {
          code: 2002,
          message: '用户不存在',
        };
      } else {
        const data = res[0];
        ctx.body = {
          data,
          code: 0,
          message: 'success'
        }
      }
    } catch (error) {
      ctx.body = {
        message: error.message
      };
    }
  }
})

// 修改个人信息
router.post('/update', async (ctx, next) => {
  const { email } = ctx.session;
  const body = ctx.request.body;
  const { username, phone, facebookAccount } = body;
  console.log('body', body);
  try {
    const querySql = `SELECT * FROM user_info_test WHERE user_email='${email}'`;
    const [res] = await connection.query(querySql);
    console.log('res1', res);
    if (!res?.length) {
      ctx.body = {
        code: 2002,
        message: '用户不存在'
      };
    } else {
      let updateSql = 'Update user_info_test SET ';
      // TODO: sql语句有点问题
      if (username) {
        updateSql += `user_name='${username}', `;
      }
      if (phone) {
        updateSql += `phone='${phone}', `;
      }
      if (facebookAccount) {
        facebook_account += `user_name='${facebookAccount}', `;
      }
      updateSql += ` WHERE user_email='${email}'`;
      // const updateSql = `Update user_info_test SET user_name='${username}', phone='${phone}', facebook_account='${facebookAccount}' WHERE user_email='${email}'`;
      const res = await connection.query(updateSql);
      console.log('addSql', res);
      ctx.body = {
        code: 0,
        message: '修改信息成功'
      }
    }
  } catch (error) {
    ctx.body = {
      message: error.message
    };
  }
})

// 修改个人信息
router.post('/admin', async (ctx, next) => {
  const body = ctx.request.body;
  const { type, email } = body;

  console.log('body', body);
  try {
    const querySql = `SELECT * FROM user_info_test WHERE user_email='${email}'`;
    const [res] = await connection.query(querySql);
    console.log('res1', res);
    if (!res?.length) {
      ctx.body = {
        code: 2002,
        message: '用户不存在'
      };
    } else {
      const updateSql = `Update user_info_test SET admin_type='${type}' WHERE user_email='${email}'`;
      const res = await connection.query(updateSql);
      console.log('addSql', res);
      ctx.body = {
        code: 0,
        message: '权限设置成功'
      }
    }
  } catch (error) {
    ctx.body = {
      message: error.message
    };
  }
})

module.exports = router.routes();