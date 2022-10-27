const Router = require('koa-router');
const connection = require('../models/db');
const ErrorType = require('../common/errorCode');
const router = new Router();

const AdminType = {
  normal: 1,
  admin: 2,
}

// 注册
router.post('/register', async (ctx, next) => {
  const body = ctx.request.body;
  const { password, email } = body;
  try {
    const querySql = `SELECT * FROM user_info_test WHERE user_email='${email}'`;
    const [res] = await connection.query(querySql);
    console.log('res1', res);
    if (res?.length > 0) {
      ctx.body = ErrorType.USERNOTEXIST;
    } else {
      const addSql = `INSERT INTO user_info_test  (user_email, password, admin_type) VALUES ('${email}', '${password}', ${AdminType.normal});`;
      const res = await connection.query(addSql);
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
    if (!res?.length) {
      ctx.body = ErrorType.USERNOTEXIST;
    } else if (res[0]?.password !== password) {
      ctx.body = ErrorType.PASSWORDNOTCORRECT;
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
  const { password } = body;
  const { email } = ctx.session;
  if (!email) {
    ctx.body = ErrorType.USERNOTLOGIN;
    next();
  }
  try {
    const querySql = `SELECT * FROM user_info_test WHERE user_email='${email}'`;
    const [res] = await connection.query(querySql);
    if (!res?.length) {
      ctx.body = ErrorType.USERNOTEXIST;
    } else {
      const updateSql = `Update user_info_test SET password='${password}' WHERE user_email='${email}'`;
      const res = await connection.query(updateSql);
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
    ctx.body = ErrorType.USERNOTLOGIN;
    next();
  }
  try {
    const querySql = `SELECT * FROM user_info_test WHERE user_email='${email}'`;
    const [res] = await connection.query(querySql);
    if (!res?.length) {
      ctx.body = ErrorType.USERNOTEXIST;
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
})

// 修改个人信息
router.post('/update', async (ctx, next) => {
  const { email } = ctx.session;
  const body = ctx.request.body;
  const { username, phone, facebookAccount } = body;
  if (!email) {
    ctx.body = ErrorType.USERNOTLOGIN;
    next();
  }
  try {
    const querySql = `SELECT * FROM user_info_test WHERE user_email='${email}'`;
    const [res] = await connection.query(querySql);
    if (!res?.length) {
      ctx.body = ErrorType.USERNOTEXIST;
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
        updateSql += `facebook_account='${facebookAccount}', `;
      }
      updateSql = updateSql.slice(0 , -2);
      updateSql += ` WHERE user_email='${email}'`;
      // const updateSql = `Update user_info_test SET user_name='${username}', phone='${phone}', facebook_account='${facebookAccount}' WHERE user_email='${email}'`;
      const res = await connection.query(updateSql);
      ctx.body = {
        code: 0,
        message: '修改信息成功'
      };
    }
  } catch (error) {
    ctx.body = {
      message: error.message
    };
  }
})

// 提供接口直接手动修改管理员
router.post('/admin', async (ctx, next) => {
  const body = ctx.request.body;
  const { type, email } = body;

  try {
    const querySql = `SELECT * FROM user_info_test WHERE user_email='${email}'`;
    const [res] = await connection.query(querySql);
    if (!res?.length) {
      ctx.body = ErrorType.USERNOTEXIST;
    } else {
      const updateSql = `Update user_info_test SET admin_type='${type}' WHERE user_email='${email}'`;
      const res = await connection.query(updateSql);
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