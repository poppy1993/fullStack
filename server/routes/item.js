const Router = require('koa-router');
const connection = require('../models/db');
const ErrorType = require('../common/errorCode');
const router = new Router();

// 商品发布
router.post('/publish', async (ctx, next) => {
  const body = ctx.request.body;
  const { title, price, type, condition, stock, shipment, desciption, cover } = body;
  const { email } = ctx.session;
  if (!email) {
    ctx.body = ErrorType.USERNOTLOGIN;
    next();
  }
  try {
    const addSql = `INSERT INTO item_info (title, price, item_type, item_condition, stock, shipment, desciption, cover, email, time) VALUES ('${title}', ${price}, ${type}, ${condition}, ${stock}, ${shipment}, '${desciption}', '${cover}', '${email}', NOW());`;
    const res = await connection.query(addSql);
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
  const { email } = ctx.session;
  if (!email) {
    ctx.body = ErrorType.USERNOTLOGIN;
    next();
  }
  try {
    const querySql = `SELECT * FROM item_info WHERE item_id=${id}`;
    const [res] = await connection.query(querySql);
    console.log('res1', res);
    if (!res?.length) {
      ctx.body = ErrorType.ITEMNOTEXIST;
    } else {
      // 这块看看怎么做增量更新
      let updateSql = `Update item_info SET `;
      // TODO: sql语句有点问题
      if (title) {
        updateSql += `title='${title}', `;
      }
      if (price) {
        updateSql += `price='${price}', `;
      }
      if (type) {
        updateSql += `item_type='${type}', `;
      }
      if (condition) {
        updateSql += `item_condition='${condition}', `;
      }
      if (stock) {
        updateSql += `stock='${stock}', `;
      }
      if (shipment) {
        updateSql += `shipment='${shipment}', `;
      }
      if (desciption) {
        updateSql += `desciption='${desciption}', `;
      }
      if (cover) {
        updateSql += `cover='${cover}', `;
      }
      updateSql += `time=now(), `;
      updateSql = updateSql.slice(0 , -2);
      updateSql += ` WHERE item_id=${id}`;
      const res = await connection.query(updateSql);
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

// 商品删除
router.post('/delete', async (ctx, next) => {
  const body = ctx.request.body;
  const { id } = body;
  console.log('body', body);
  const { email } = ctx.session;
  if (!email) {
    ctx.body = ErrorType.USERNOTLOGIN;
    next();
  }
  try {
    const querySql = `SELECT * FROM item_info WHERE item_id=${id}`;
    const [res] = await connection.query(querySql);
    console.log('res1', res);
    if (!res?.length) {
      ctx.body = ErrorType.ITEMNOTEXIST;
    } else {
      const deleteSql = `DELETE FROM item_info WHERE item_id=${id}`;
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
  const body = ctx.request.body;
  console.log('body', body);
  const { id } = body;
  try {
    const querySql = `SELECT * FROM item_info WHERE item_id=${id}`;
    const [res] = await connection.query(querySql);
    console.log('res1', res);
    if (!res?.length) {
      ctx.body = ErrorType.ITEMNOTEXIST;
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
  const { userId } = ctx.request.body;
  try {
    const querySql = `SELECT * FROM user_info_test WHERE user_id=${userId}`;
    const [res] = await connection.query(querySql);
    if (!res?.length) {
      ctx.body = ErrorType.USERNOTEXIST;
    } else {
      const { user_email } = res[0];
      const querySql = `SELECT * FROM item_info WHERE email='${user_email}'`;
      const [list] = await connection.query(querySql);
      console.log('addSql', res);
      ctx.body = {
        data: {
          sellerInfo: res[0],
          list: list
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

// 商品评论更新
router.post('/updateComment', async (ctx, next) => {
  const body = ctx.request.body;
  const { id, comment } = body;
  const { email } = ctx.session;
  if (!email) {
    ctx.body = ErrorType.USERNOTLOGIN;
    next();
  }
  try {
    const querySql = `SELECT * FROM item_info WHERE item_id=${id}`;
    const [res] = await connection.query(querySql);
    console.log('res11111', res, !res?.length);
    if (!res?.length) {
      console.log('item111', 111);
      ctx.body = ErrorType.ITEMNOTEXIST;
    } else {
      console.log('item222', 222);
      const { comments } = res[0];
      let commentsData = [];

      try {
        commentsData = comments ? JSON.parse(comments) : [];
      } catch {
      }
      commentsData.push({
        content: comment,
        name: email,
        time: Date.now()
      });
      // 这块看看怎么做增量更新
      let updateSql = `Update item_info SET comments='${JSON.stringify(commentsData)}' WHERE item_id=${id}`;
      const res1 = await connection.query(updateSql);
      ctx.body = {
        code: 0,
        message: '修改成功'
      }
    }
  } catch (error) {
    console.log('item222', error);

    ctx.body = {
      message: error.message
    };
  }
})

module.exports = router.routes();