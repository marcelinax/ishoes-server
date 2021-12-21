const router = require('express').Router();

router.use('/brands', require('./brands'));
router.use('/shoeProducts', require('./shoeProducts'));

module.exports = router;