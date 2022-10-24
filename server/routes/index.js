const Router = require('koa-router');
const user = require('./user');
const action = require('./action');

const router = new Router()

router.use('/user', user);
router.use('/action', action);

module.exports = router;
