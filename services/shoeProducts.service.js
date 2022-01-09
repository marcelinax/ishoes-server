const ShoeProduct = require("../models/ShoeProduct")


const getAllShoeProducts = async () => {
    const shoeProducts = await ShoeProduct.find().populate('brand');
    return shoeProducts;
}

const getAllSoldOutShoeProducts = async () => {
    const soldOutShoeProducts = await ShoeProduct.find({ $where: { amount: 0 } }).populate('brand');
    return soldOutShoeProducts;
}


const findShoeProductById = async (shoeProductId) => {
    const shoeProduct = await ShoeProduct.findById(shoeProductId).populate('brand');
    return shoeProduct;
}

const checkIfShoeProductObjExists = async (shoeProduct) => {
    const shoeProductFind = await ShoeProduct.findOne({ ...shoeProduct });
    return shoeProductFind !== null;
}

const createShoeProduct = async (shoeProduct) => {
    const createdShoeProduct = await new ShoeProduct(shoeProduct);
    await createdShoeProduct.save();
    return createdShoeProduct;
}

const deleteShoeProductById = async (shoeProductId) => {
    await ShoeProduct.findByIdAndRemove(shoeProductId);
    return;
}

const updateShoeProduct = async (shoeProductId, updatedShoeProduct) => {
    const shoeProduct = ShoeProduct.findByIdAndUpdate(shoeProductId, updatedShoeProduct, { new: true });
    return shoeProduct;

}

const getRatingsForShoeProduct = async (shoeProductId) => {
    const shoeProduct = await ShoeProduct.findById(shoeProductId);
    const ratings = [];
    await shoeProduct.opinions.forEach(opinion => {
        ratings.push(opinion.rating);
    })
    if (ratings.length > 0) return Math.ceil(ratings.reduce((acc, cur) => acc + cur) / ratings.length);
    return 0;
}

const createOpinionForShoeProduct = async (shoeProductId, opinion) => {
    const shoeProduct = await ShoeProduct.findById(shoeProductId);
    shoeProduct.opinions = [...shoeProduct.opinions, opinion];
    shoeProduct.save();
    return;
}

const searchShoeProducts = async (query, brand,material, size, gender, sortBy, sortHow, minPrice, maxPrice,isOnSale, type,colors) => {
    let searchingShoeProducts = await ShoeProduct.find().populate('brand').lean();

    if (query) {
        searchingShoeProducts = searchingShoeProducts.filter(shoeProduct => shoeProduct.model.toLowerCase().includes(query.toLowerCase())
            || shoeProduct.brand.name.toLowerCase().includes(query.toLowerCase()));
    }

    if (sortBy === 'popularity') {
        if (sortHow === 'popular') {
         
            searchingShoeProducts = searchingShoeProducts.sort((a, b) => getRatingsForShoeProduct(b) - getRatingsForShoeProduct(a));
        }
    }

    if (sortBy === 'added') {
        if (sortHow === 'newest') {
            searchingShoeProducts = searchingShoeProducts.sort((a, b) => b.createdAt - a.createdAt)
            console.log(searchingShoeProducts)
        }
        if (sortHow === 'oldest') {
            searchingShoeProducts = searchingShoeProducts.sort((a,b) => a.createdAt - b.createdAt)
        }
    }

    if (sortBy === 'price') {
        if (sortHow === 'cheapest') searchingShoeProducts = searchingShoeProducts.sort((a, b) => (b.price - (((b.price * b.discount) /100 ).toFixed(2))) - (a.price - (((a.price * a.discount) /100 ).toFixed(2))));
            if (sortHow === 'most expensive') searchingShoeProducts = searchingShoeProducts.sort((a, b) => (((a.price * a.discount) /100 ).toFixed(2)) - (b.price - (((b.price * b.discount) /100 ).toFixed(2))));
    }
    

    if (size) searchingShoeProducts = searchingShoeProducts.filter(shoeProduct => shoeProduct.size === size);

    if (gender && gender.length > 0) searchingShoeProducts = searchingShoeProducts.filter(shoeProduct => gender.includes(shoeProduct.gender));

    if (minPrice && maxPrice) {
        searchingShoeProducts = searchingShoeProducts.filter(shoeProduct => (shoeProduct.price - (((shoeProduct.price * shoeProduct.discount) /100 ).toFixed(2))) >= minPrice && (((shoeProduct.price * shoeProduct.discount) /100 ).toFixed(2)) <= maxPrice);
    }

    if(isOnSale !== null && isOnSale !== undefined) searchingShoeProducts = searchingShoeProducts.filter(shoeProduct => shoeProduct.isOnSale === isOnSale)

    if (brand) searchingShoeProducts = searchingShoeProducts.filter(shoeProduct => shoeProduct.brand._id.toString() == brand.toString());

    if (type && type !== 'All')  searchingShoeProducts = searchingShoeProducts.filter(shoeProduct => shoeProduct.type.includes(type));
   
    if (material) searchingShoeProducts = searchingShoeProducts.filter(shoeProduct => shoeProduct.material.includes(material));
    
    if (colors) searchingShoeProducts = searchingShoeProducts.filter(shoeProduct => shoeProduct.colors.includes(colors));

    return searchingShoeProducts;
}

module.exports = {
    getAllShoeProducts,
    findShoeProductById,
    createShoeProduct,
    deleteShoeProductById,
    updateShoeProduct,
    searchShoeProducts,
    getAllSoldOutShoeProducts,
    getRatingsForShoeProduct,
    createOpinionForShoeProduct,
    checkIfShoeProductObjExists
}