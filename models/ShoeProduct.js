const mongoose = require('mongoose');


const shoeProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: true
    },
    colors: {
        type: [String],
        required: true
    },
    brand: {
        type: String,
        ref: 'Brand',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    isOverpriced: {
        type: Boolean,
        required: true,
        default: false
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
            createdAt: {
                type: Number,
                default: new Date(),
            }
        },
        ],
        default: []
    }    
},
{timestamps: true}
)

module.exports = mongoose.model('ShoeProduct', shoeProductSchema);