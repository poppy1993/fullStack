const Router = require('koa-router');
const user = require('./user');
const action = require('./action');
const banner = require('./banner');
const item = require('./item');
const message = require('./message');

const router = new Router()

router.use('/user', user);
router.use('/action', action);
router.use('/banner', banner);
router.use('/item', item);
router.use('/message', message);

module.exports = router;
