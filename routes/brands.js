const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const brandsController = require('../controllers/brand.controller');
const Brand = require('../models/Brand');

router.get('/', brandsController.getAllBrands);

router.post('/',
    check('name').not().isEmpty().withMessage('Enter a brand name').custom(function (name) {
        return new Promise(function (resolve, reject) {
            Brand.findOne({ name }).then(function (brand) {
                if (brand) reject(false)
                resolve()
            })
        }) 
    }).withMessage('This brand has already been added'),
    brandsController.createBrand)
 
router.delete('/:id', brandsController.deleteBrand);

router.post('/deleteAllBrands', brandsController.deleteAllBrands)

router.get('/:id', brandsController.getBrand)

router.post('/search', brandsController.searchBrands)

module.exports = router;