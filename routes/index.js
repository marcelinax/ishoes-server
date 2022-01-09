const router = require('express').Router();

router.use('/brands', require('./brands'));
router.use('/orders', require('./orders'));
router.use('/shoeProducts', require('./shoeProducts'));

module.exports = router;