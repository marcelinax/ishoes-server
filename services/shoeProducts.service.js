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

const searchShoeProducts = async ({ query, brand, brands, isOutOfStock, material, size, sizes, gender, genders, sortBy, minPrice, maxPrice,isOnSale, type, types, colors, page}) => {
    let searchingShoeProducts = await ShoeProduct.find().populate('brand').lean();

    if (query) {
        searchingShoeProducts = searchingShoeProducts.filter(shoeProduct => shoeProduct.model.toLowerCase().includes(query.toLowerCase().trim())
            || shoeProduct.brand.name.toLowerCase().includes(query.toLowerCase().trim()) || shoeProduct._id.toString().startsWith(query.trim()));
    }

    if (sortBy || sortBy === 'all') {
        if (sortBy === 'popular') {
            searchingShoeProducts = searchingShoeProducts.sort((a, b) => getRatingsForShoeProduct(b) - getRatingsForShoeProduct(a));
        }
    
        if (sortBy === 'newest') {
            searchingShoeProducts = searchingShoeProducts.sort((a, b) => b.createdAt - a.createdAt)
        }
    
        if (sortBy === 'oldest') {
            searchingShoeProducts = searchingShoeProducts.sort((a,b) => a.createdAt - b.createdAt)
        }
    
        if (sortBy === 'low-price') searchingShoeProducts = searchingShoeProducts.sort((a, b) => (a.price - (((a.price * a.discount) /100 ).toFixed(2))) - (b.price - (((b.price * b.discount) /100 ).toFixed(2))));
            
        
        if (sortBy === 'high-price') searchingShoeProducts = searchingShoeProducts.sort((a, b) => (b.price - (((b.price * b.discount) /100 ).toFixed(2))) - (a.price - (((a.price * a.discount) /100 ).toFixed(2))));
        
    }
   
    if (size) searchingShoeProducts = searchingShoeProducts.filter(shoeProduct => shoeProduct.size === size);
    
    if (sizes && sizes.length > 0) searchingShoeProducts = searchingShoeProducts.filter(shoeProduct => sizes.includes(shoeProduct.size));

    if (gender) searchingShoeProducts = searchingShoeProducts.filter(shoeProduct => shoeProduct.gender === gender);

    if (genders && genders.length > 0) searchingShoeProducts = searchingShoeProducts.filter(shoeProduct => genders.includes(shoeProduct.gender));



    if ((minPrice || minPrice === 0 ) && (maxPrice ) ) {
        searchingShoeProducts = searchingShoeProducts.filter(shoeProduct => ((shoeProduct.price - (((shoeProduct.price * shoeProduct.discount) /100 ).toFixed(2))) >= minPrice && (shoeProduct.price - ((shoeProduct.price * shoeProduct.discount) /100 )).toFixed(2) <= maxPrice));
    console.log(searchingShoeProducts)
    }

    if (isOutOfStock !== null) {
        if (isOutOfStock === true) searchingShoeProducts = searchingShoeProducts.filter(shoeProduct => shoeProduct.amount === 0);
        else searchingShoeProducts = searchingShoeProducts.filter(shoeProduct => shoeProduct.amount > 0);
    }

    if(isOnSale !== null && isOnSale !== undefined) searchingShoeProducts = searchingShoeProducts.filter(shoeProduct => shoeProduct.isOnSale === isOnSale)

    if (brand) searchingShoeProducts = searchingShoeProducts.filter(shoeProduct => shoeProduct.brand._id.toString() == brand.toString());

    if (brands && brands.length > 0) searchingShoeProducts = searchingShoeProducts.filter(shoeProduct => brands.includes(shoeProduct.brand._id.toString()));


    if (type && type !== 'All') searchingShoeProducts = searchingShoeProducts.filter(shoeProduct => shoeProduct.type.includes(type));
    
    if (types && types.length > 0)  searchingShoeProducts = searchingShoeProducts.filter(shoeProduct => types.includes(shoeProduct.type));
   
    if (material) searchingShoeProducts = searchingShoeProducts.filter(shoeProduct => shoeProduct.material.includes(material));
    
    if (colors && colors.length > 0) searchingShoeProducts = searchingShoeProducts.filter(shoeProduct => colors.some(i => shoeProduct.colors.includes(i)));



    const totalItems = searchingShoeProducts.length;

    if ( page || page === 0 ) {
        const limit = 1;
        let startIndex = (page - 1) * limit
        let endIndex = page  * limit;
      
        searchingShoeProducts = searchingShoeProducts.slice(startIndex, endIndex)
    }

    return {searchingShoeProducts, totalItems};
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