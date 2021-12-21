const mongoose = require('mongoose');

const opinionSchema = new mongoose.Schema({
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
})

module.exports = mongoose.model('Opinion', opinionSchema);