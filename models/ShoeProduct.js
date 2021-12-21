const mongoose = require('mongoose');
const Brand = require('./Brand');
const Opinion = require('./Opinion');

const shoeProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    sizes: {
        type: [Number],
        required: true
    },
    colors: {
        type: [String],
        required: true
    },
    brand: {
        type: Brand,
        required: true
    },
    price: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    discount: {
        type: Number,
        min: 1,
        max: 100
    },
    photosUrls: {
        type: [String],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    ratings: {
        type: [Number]
    },
    sex: {
        type: [String],
        required: true
    },
    type: {
        type: [String],
        required: true
    },
    opinions: {
        type: [{
            title: {
                type: String,
                required: true
            },
            content: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true,
                min: 1,
                max: 5
            },
            timestamps: {
                createdAt: true,
                updatedAt: false
            }
        }],
        default: []
    }

})

module.exports = mongoose.model('ShoeProduct', shoeProductSchema);