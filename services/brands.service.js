const Brand = require("../models/Brand")



const getAllBrands = async () => {
    const brands = await Brand.find();
    const sortedBrands = brands.sort((a, b) => a.name.localeCompare(b.name));
    return sortedBrands;
}

const findBrandById = async (brandId) => {
    const brand = await Brand.findById(brandId);
    return brand;
}

const createBrand = async (newBrand) => {
    const createdBrand = await new Brand(newBrand);
    await createdBrand.save();
    return createdBrand;
}

const deleteBrandById = async (brandId) => {
    await Brand.findByIdAndRemove(brandId);
    return;
}

const searchBrands = async (query) => {
    let searchingBrands = await Brand.find().lean();

    if (query) {
        searchingBrands = searchingBrands.filter(brand => brand.includes(query));
    }
    return searchingBrands;
};

const deleteAllBrands = async () => {
    await Brand.deleteMany();
    return;
}

module.exports = {
    getAllBrands,
    findBrandById,
    createBrand,
    deleteBrandById,
    searchBrands,
    deleteAllBrands
}