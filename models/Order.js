const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true
    },
    surname: {
        type: String,
        minlength: 3,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    products: [
        {
            type: String,
            ref: 'ShoeProduct'
        }
    ],
    deliveryAddress: {
        type: {
            city: {
                type: String,
                required: true
            },
            zipCode: {
                type: String,
                required: true
            },
            address: {
                type: String,
                required: true
            },
            additionalInformation: {
                type: String
            }
        },
    },
    status: {
        type: String,
        required: true,
    },
    sendDate: {
        type: Date
    },
    paymentId: {
        type: String,
        required: true
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);