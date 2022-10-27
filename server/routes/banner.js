const Router = require('koa-router');
const connection = require('../models/db');
const router = new Router();

// banner创建
router.post('/create', async (ctx, next) => {
  const body = ctx.request.body;
  const { name, picture, type, subType } = body;
  console.log('body', body);
  const { email } = ctx.session;
  if (!email) {
    ctx.body = {
        code: 3000,
        message: '请登录'
    };
    next();
}
  try {
    const addSql = `INSERT INTO banner_info  (name, picture, type, sub_type, time) VALUES ('${name}', '${picture}', ${type}, ${subType}, NOW());`;
    console.log('addSql', addSql);
    const res = await connection.query(addSql);
    console.log('addSql', res);
    ctx.body = {
      code: 0,
      message: '创建成功'
    }
  } catch (error) {
    ctx.body = {
      message: error.message
    };
  }
})

// banner更新
router.post('/update', async (ctx, next) => {
  const body = ctx.request.body;
  const { id, name, picture, type, subType } = body;
  console.log('body', body);
  const { email } = ctx.session;
  if (!email) {
    ctx.body = {
        code: 3000,
        message: '请登录'
    };
    next();
  }
  try {
    const querySql = `SELECT * FROM banner_info WHERE id=${id}`;
    const [res] = await connection.query(querySql);
    console.log('res1', res);
    if (!res?.length) {
      ctx.body = {
        code: 2002,
        message: '该商品不存在'
      };
    } else {
      // 这块看看怎么做增量更新
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

// banner删除
router.post('/delete', async (ctx, next) => {
  const body = ctx.request.body;
  const { id } = body;
  console.log('body', body);
  const { email } = ctx.session;
  if (!email) {
    ctx.body = {
        code: 3000,
        message: '请登录'
    };
    next();
  }
  try {
    const querySql = `SELECT * FROM banner_info WHERE id=${id}`;
    const [res] = await connection.query(querySql);
    console.log('res1', res);
    if (!res?.length) {
      ctx.body = {
        code: 2002,
        message: '该banner不存在'
      };
    } else {
      const deleteSql = `DELETE FROM banner_info WHERE id=${id}`;
      const res = await connection.query(deleteSql);
      ctx.body = {
        code: 0,
        message: '删除成功'
      }
    }
  } catch (error) {
    ctx.body = {
      message: error.message
    };
  }
})

// banner列表
router.get('/list', async (ctx, next) => {
  try {
    const querySql = 'SELECT * FROM banner_info';
    const [res] = await connection.query(querySql);
    console.log('res1', res);
    ctx.body = {
      data: res,
      code: 0,
      message: 'success'
    }
  } catch (error) {
    ctx.body = {
      message: error.message
    };
  }
})

module.exports = router.routes();