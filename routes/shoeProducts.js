const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const shoeProductsController = require('../controllers/shoeProduct.controller');

router.get('/', shoeProductsController.getAllShoeProducts);

router.get('/soldout', shoeProductsController.getAllSoldOutShoeProducts);

router.post('/',
    check('model').not().isEmpty().withMessage('Enter a model'),
    check('size').not().isEmpty().withMessage('Choose size'),
    check('colors').not().isEmpty().withMessage('Choose color/s'),
    check('material').not().isEmpty().withMessage('Choose material'),
    check('brand').not().isEmpty().withMessage('Choose brand'),
    check('price').not().isEmpty().withMessage('Enter a price'),
    check('photos').not().isEmpty().withMessage('Add at least one photo'),
    check('amount').not().isEmpty().withMessage('Enter an amount'),
    shoeProductsController.createShoeProduct);

router.delete('/:id', shoeProductsController.deleteShoeProduct);

router.get('/:id', shoeProductsController.getShoeProduct);

router.put('/:id',
    check('model').not().isEmpty().withMessage('Enter a model'),
    check('size').not().isEmpty().withMessage('Choose size'),
    check('colors').not().isEmpty().withMessage('Choose color/s'),
    check('material').not().isEmpty().withMessage('Choose material'),
    check('brand').not().isEmpty().withMessage('Choose brand'),
    check('price').not().isEmpty().withMessage('Enter a price'),
    check('photos').not().isEmpty().withMessage('Add at least one photo'),
    check('amount').not().isEmpty().withMessage('Enter an amount')
    , shoeProductsController.updateShoeProduct);

router.post('/search', shoeProductsController.searchShoeProduct);

router.post('/addOpinion/:id', shoeProductsController.createOpinionForShoeProduct);

router.get('/ratings/:id', shoeProductsController.getRatingsForShoeProduct);





module.exports = router;