const { validationResult } = require("express-validator");
const errors = require("../errors/errors");
const brandsService = require('../services/brands.service');



const getAllBrands = async (req, res) => {
    try {
        res.status(201).json(await brandsService.getAllBrands());
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getBrand = async (req, res) => {
    try {
        const brand = await brandsService.findBrandById(req.params.id);
        if (!brand) return res.status(404).json({ message: errors.CANNOT_FIND_BRAND });
        else res.json(brand);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createBrand = async (req, res) => {
    
    if (validationResult(req).errors.length > 0) return res.status(400).json(validationResult(req));
    
    try {
        const { name } = req.body;
        const newBrand = await brandsService.createBrand({ name });
        res.status(201).json(newBrand);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteBrand = async (req, res) => {
    try {
        const id = req.params.id;
        await brandsService.deleteBrandById(id);
        res.status(201).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const deleteAllBrands = async (req,res) => {
    try {
        await brandsService.deleteAllBrands();
        res.status(201).json({ message: errors.DELETED_ALL_BRANDS });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const searchBrands = async (req, res) => {
    const { query } = req.body;
    res.json(await brandsService.searchBrands(query));
}

module.exports = {
    getAllBrands,
    getBrand,
    createBrand,
    deleteBrand,
    deleteAllBrands,
    searchBrands
}