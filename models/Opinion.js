const mongoose = require('mongoose');

const opinionSchema = new mongoose.Schema({
    title: {
        type: String,
        required
    },
    content: {
        type: String,
        required
    },
    name: {
        type: String,
        required
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