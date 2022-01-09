
const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const ordersController = require('../controllers/orders.controller');

router.get('/', ordersController.getAllOrders);

router.get('/:id', ordersController.getOrder);

router.post('/',
    check('name').isLength({ min: 3 }).withMessage('Name must contains at least 3 characters'),
    check('surname').isLength({ min: 3 }).withMessage('Surname must contains at least 3 characters'),
    check('email').not().isEmpty().withMessage('Enter email').isEmail().withMessage('Invalid email'),
    check('deliveryAddress.city').not().isEmpty().withMessage('Enter city'),
    check('deliveryAddress.zipCode').not().isEmpty().withMessage('Enter zipcode').isPostalCode('US').withMessage('Invalid zip code'),
    check('deliveryAddress.address').not().isEmpty().withMessage('Enter address'),
    check('status').not().isEmpty().withMessage('Enter status'),
    check('paymentId').not().isEmpty().withMessage('Enter payment id'),
    check('products').not().isEmpty().withMessage('No products')
    , ordersController.createOrder);

router.post('/search', ordersController.searchOrder);

router.post('/change-status/:id', ordersController.changeOrderStatus);

module.exports = router;


