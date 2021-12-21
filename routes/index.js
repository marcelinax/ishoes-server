const router = require('express').Router();

router.use('/opinions', require('./opinions'));
router.use('/brands', require('./brands'));
router.use('/shoeProducts', require('./shoeProducts'));

module.exports = router;