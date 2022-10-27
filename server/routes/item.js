const Router = require('koa-router');
const connection = require('../models/db');
const router = new Router();

// 商品发布
router.post('/publish', async (ctx, next) => {
  const body = ctx.request.body;
  const { title, type, condition, price, stock, shipment, desciption, cover } = body;
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
    const addSql = `INSERT INTO item_info  (title, type, condition, price, stock, shipment, desciption, cover, email) VALUES ('${title}', ${type}, ${condition}, ${price}, ${stock}, ${shipment}, '${desciption}', '${cover}', '${email}');`;
    console.log('addSql', addSql);
    const res = await connection.query(addSql);
    console.log('addSql', res);
    ctx.body = {
      code: 0,
      message: '发布成功'
    }
  } catch (error) {
    ctx.body = {
      message: error.message
    };
  }
})

// 商品更新
router.post('/update', async (ctx, next) => {
  const body = ctx.request.body;
  const { id, title, type, condition, price, stock, shipment, desciption, cover } = body;
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
    const querySql = `SELECT * FROM item_info WHERE id=${id}`;
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

// 商品删除
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
    const querySql = `SELECT * FROM item_info WHERE id=${id}`;
    const [res] = await connection.query(querySql);
    console.log('res1', res);
    if (!res?.length) {
      ctx.body = {
        code: 2002,
        message: '该商品不存在'
      };
    } else {
      const deleteSql = `DELETE FROM item_info WHERE id=${id}`;
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

// 获取商品信息
router.post('/info', async (ctx, next) => {
  const { id } = ctx.request.body;
  console.log('body', body);
  try {
    const querySql = `SELECT * FROM item_info WHERE id=${id}`;
    const [res] = await connection.query(querySql);
    console.log('res1', res);
    if (!res?.length) {
      ctx.body = {
        code: 2002,
        message: '商品不存在',
      };
    } else {
      const data = res[0];
      const { email } = data;
      // 获取卖家信息
      const querySql = `SELECT * FROM user_info_test WHERE user_email='${email}'`;
      const [sellerInfo] = await connection.query(querySql);
      ctx.body = {
        data: {
          itemInfo: data,
          sellerInfo: sellerInfo[0]
        },
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

// 获取商品列表
// TODO 筛选项过滤功能
router.get('/list', async (ctx, next) => {
  try {
    const querySql = 'SELECT * FROM item_info';
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

// 卖家商店信息
router.post('/seller', async (ctx, next) => {
  const { id } = ctx.request.body;
  console.log('body', body);
  try {
    const querySql = `SELECT * FROM user_info_test WHERE id=${id}`;
    const [res] = await connection.query(querySql);
    console.log('res1', res);
    if (!res?.length) {
      ctx.body = {
        code: 2002,
        message: '用户不存在'
      };
    } else {
      const { email } = res[0];
      const querySql = `SELECT * FROM item_info WHERE email='${email}'`;
      const [list] = await connection.query(querySql);
      console.log('addSql', res);
      ctx.body = {
        data: {
          sellerInfo: res[0],
          list: list[0]
        },
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

module.exports = router.routes();