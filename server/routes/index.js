const Router = require('koa-router');
const login = require('./login');
const user = require('./user');
const action = require('./action');

const router = new Router()

router.use('/api', login);
router.use('/user', user);
router.use('/action', action);

module.exports = router;
