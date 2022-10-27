const Router = require('koa-router');
const connection = require('../models/db');
const ErrorType = require('../common/errorCode');
const router = new Router();

// banner创建
router.post('/create', async (ctx, next) => {
  const body = ctx.request.body;
  const { name, picture, type, subType } = body;
  const { email } = ctx.session;
  if (!email) {
    ctx.body = ErrorType.USERNOTLOGIN;
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
  const { email } = ctx.session;
  if (!email) {
    ctx.body = ErrorType.USERNOTLOGIN;
    next();
  }
  try {
    const querySql = `SELECT * FROM banner_info WHERE banner_id=${id}`;
    const [res] = await connection.query(querySql);
    if (!res?.length) {
      ctx.body = ErrorType.BANNERNOTEXIST;
    } else {
      // 这块看看怎么做增量更新
      let updateSql = `Update banner_info SET `;
      // TODO: sql语句有点问题
      if (name) {
        updateSql += `name='${name}', `;
      }
      if (picture) {
        updateSql += `picture='${picture}', `;
      }
      if (type) {
        updateSql += `type='${type}', `;
      }
      if (subType) {
        updateSql += `sub_type='${subType}', `;
      }
      updateSql += `time=now(), `;
      updateSql = updateSql.slice(0 , -2);
      updateSql += ` WHERE banner_id=${id}`;
      // const updateSql = `Update user_info_test SET user_name='${username}', phone='${phone}', facebook_account='${facebookAccount}' WHERE user_email='${email}'`;
      const res = await connection.query(updateSql);
      console.log('addSql', res);
      ctx.body = {
        code: 0,
        message: '修改成功'
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
  const { email } = ctx.session;
  if (!email) {
    ctx.body = ErrorType.USERNOTLOGIN;
    next();
  }
  try {
    const querySql = `SELECT * FROM banner_info WHERE banner_id=${id}`;
    const [res] = await connection.query(querySql);
    if (!res?.length) {
      ctx.body = ErrorType.BANNERNOTEXIST;
    } else {
      const deleteSql = `DELETE FROM banner_info WHERE banner_id=${id}`;
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