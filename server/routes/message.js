const Router = require('koa-router');
const connection = require('../models/db');
const ErrorType = require('../common/errorCode');
const router = new Router();

const MessageStatus = {
  Read: 1,
  Unread: 2,
  Solved: 3,
  Pending: 4,
}

// message创建
router.post('/send', async (ctx, next) => {
  const body = ctx.request.body;
  const { content, receiver } = body;
  const { email } = ctx.session;
  if (!email) {
    ctx.body = ErrorType.USERNOTLOGIN;
    next();
  }
  // 如何设置必填项
  try {
    const addSql = `INSERT INTO message_info  (content, receiver, sender, status, time) VALUES ('${content}', '${receiver}', '${email}', ${MessageStatus.Unread},  NOW());`;
    console.log('addSql', addSql);
    const res = await connection.query(addSql);
    console.log('addSql', res);
    ctx.body = {
      code: 0,
      message: '发送成功'
    }
  } catch (error) {
    ctx.body = {
      message: error.message
    };
  }
})

// message更新状态
router.post('/updateStatus', async (ctx, next) => {
  const body = ctx.request.body;
  const { id, status } = body;
  const { email } = ctx.session;
  if (!email) {
    ctx.body = ErrorType.USERNOTLOGIN;
    next();
  }
  try {
    const querySql = `SELECT * FROM message_info WHERE message_id=${id}`;
    const [res] = await connection.query(querySql);
    if (!res?.length) {
      ctx.body = ErrorType.MESSAGENOTEXIST;
    } else {
      const updateSql = `Update message_info SET status=${status} WHERE message_id=${id}`;
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
  console.log('body', body);
  const { email } = ctx.session;
  if (!email) {
    ctx.body = ErrorType.USERNOTLOGIN;
    next();
  }
  try {
    const querySql = `SELECT * FROM message_info WHERE message_id=${id}`;
    const [res] = await connection.query(querySql);
    console.log('res1', res);
    if (!res?.length) {
      ctx.body = {
        code: 2002,
        message: '该消息不存在'
      };
    } else {
      const deleteSql = `DELETE FROM message_info WHERE message_id=${id}`;
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
  const { email } = ctx.session;
  if (!email) {
    ctx.body = ErrorType.USERNOTLOGIN;
    next();
  }
  try {
    const querySql = `SELECT * FROM message_info WHERE receiver='${email}'`;
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