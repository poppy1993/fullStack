const Router = require('koa-router');
const Model = require('../models/model');
const connection = require('../models/db');

const router = new Router();

router.post('/create', async (ctx, next) => {
    const body = ctx.request.body;
    const data = new Model({
        name: body.name,
        price: body.price
    })
    try {
        const addSql = `INSERT INTO item_info  (item_title, item_price, submit_date) VALUES ('${body.name}', ${body.price}, NOW());`;
        // const addSql = 'INSERT INTO item_info  (item_title, item_price, submit_date) VALUES ("学习 雷锋", 123, NOW());';
        console.log('addSql', addSql, connection);
        const res = await connection.query(addSql);
        console.log('res', res);
        ctx.body = {
            code: 0,
            msg: '新增成功'
        };
    } catch (error) {
        ctx.body = {
            message: error.message
        };
    }
});

//Update by ID Method
router.post('/update', async (ctx, next) => {
    const body = ctx.request.body;
    const { id, name, price } = body;
    try {
        const updatedData = {
            name,
            price
        };
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        ctx.body = result;
    } catch (error) {
        ctx.body = {
            message: error.message
        };
    }
});

//Delete by ID Method
router.post('/delete', async (ctx, next) => {
    const body = ctx.request.body;
    const { id } = body;
    try {
        const data = await Model.findByIdAndDelete(id)
        ctx.body = result;
    } catch (error) {
        ctx.body = {
            message: error.message
        };
    }
});

//Get all Method
router.get('/getAll', async (ctx, next) => {
    console.log('ctx.session', ctx.session);
    const { email } = ctx.session;
    if (!email) {
        ctx.body = {
            code: 3000,
            message: '请登录'
        };
        next();
    }
    try{
        const querySql = 'SELECT * FROM item_info';
        console.log('querySql', querySql);
        const res = await connection.query(querySql);
        console.log('res', res);
        ctx.body = res;
    } catch(error){
        ctx.body = {
            message: error.message
        };
    }
});

//Get by ID Method
router.get('/getOne', async (ctx, next) => {
    const params = ctx.request.query;
    try{
        const data = await Model.find(params.id);
        ctx.body = data;
    } catch(error){
        ctx.body = {
            message: error.message
        };
    }
});

module.exports = router.routes();
