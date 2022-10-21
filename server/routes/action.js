const Router = require('koa-router');
const Model = require('../models/model');

const router = new Router();

router.post('/create', async (ctx, next) => {
    const body = ctx.request.body;
    const data = new Model({
        name: body.name,
        price: body.price
    })
    try {
        const dataToSave = await data.save();
        // res.status(200).json(dataToSave)
        ctx.body = dataToSave;
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
    try{
        const data = await Model.find();
        ctx.body = data;
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
