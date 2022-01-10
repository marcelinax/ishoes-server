const errors = require('../errors/errors');
const shoeProductsService = require('../services/shoeProducts.service');
const { validationResult } = require("express-validator");
const getAllShoeProducts = async (req, res) => {
    try {
        res.status(201).json(await shoeProductsService.getAllShoeProducts());
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllSoldOutShoeProducts = async (req, res) => {
    try {
        res.status(201).json(await shoeProductsService.getAllSoldOutShoeProducts());
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getShoeProduct = async (req, res) => {
    try {
        const shoeProduct = await shoeProductsService.findShoeProductById(req.params.id);
        if (!shoeProduct) return res.status(404).json({ message: errors.CANNOT_FIND_SHOES });
        else return res.status(201).json(shoeProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createShoeProduct = async (req, res) => {
    if (validationResult(req).length > 0) return res.status(400).json(validationResult(req));

    try {
        const { model, size, material, colors, brand, price, isOnSale, discount, photos, amount, gender, type, opinions } = req.body;
        if (await shoeProductsService.checkIfShoeProductObjExists({ model, size, material, colors: colors.sort(), brand, price, gender, type })) {
            return res.status(400).json({ message: errors.PRODUCT_ALREADY_EXISTS });
        }
        const newShoeProduct = await shoeProductsService.createShoeProduct({
            model, size, material, colors, brand, price, isOnSale, discount, photos, amount, gender, type, opinions
        })
        res.status(201).json(newShoeProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteShoeProduct = async (req, res) => {
    try {
        const id = req.params.id;
        await shoeProductsService.deleteShoeProductById(id);
        res.status(201).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const updateShoeProduct = async (req, res) => {
    if (validationResult(req).length > 0) return res.status(400).json(validationResult(req));

    try {
        const id = req.params.id;
        const { model, size, material, colors, brand, price, isOnSale, discount, photos, amount, gender, type, opinions } = req.body;
        const updatedShoeProduct = await shoeProductsService.updateShoeProduct(id, {
            model, size, colors, material, brand, price, isOnSale, discount, photos, amount, gender, type, opinions
        })
        res.status(201).json(updatedShoeProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const searchShoeProduct = async (req, res) => {
    const { query, brand, material, isOutOfStock, size, gender, sortBy, sortHow, minPrice, maxPrice,isOnSale, type,colors } = req.body;
    res.json(await shoeProductsService.searchShoeProducts({query, brand,isOutOfStock, material, size, gender, sortBy, sortHow, minPrice, maxPrice,isOnSale, type,colors}));
};

const getRatingsForShoeProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const ratings = await shoeProductsService.getRatingsForShoeProduct(id);
        res.status(201).json(ratings)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createOpinionForShoeProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const { model, content, name, rating } = req.body;
        await shoeProductsService.createOpinionForShoeProduct(id, {
            model, content, name, rating
        });
        res.status(201).json({ message: 'Opinion has been added' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
  


module.exports = {
    getAllShoeProducts,
    getAllSoldOutShoeProducts,
    getShoeProduct,
    createShoeProduct,
    deleteShoeProduct,
    updateShoeProduct,
    searchShoeProduct,
    getRatingsForShoeProduct,
    createOpinionForShoeProduct
}