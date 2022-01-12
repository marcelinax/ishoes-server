const Order = require("../models/Order");
const moment = require('moment');

const getAllOrders = async () => {
    const orders = await Order.find().populate('products');
    return orders;
};

const findOrderById = async (orderId) => {
    const order = await Order.findById(orderId).populate('products');
    return order;
}

const createOrder = async (newOrder) => {
    const createdOrder = await new Order(newOrder);
    await createdOrder.save();
    return createdOrder;
}


const searchOrders = async (orderId, email, dateOfOrder, sendDate, status, phone, page) => {
    let searchingOrders = await Order.find().populate('products').lean();
    

    if (orderId) {
        searchingOrders = searchingOrders.filter(order => order._id.toString().startsWith(orderId.trim()));
    }

    if (email) {
        searchingOrders = searchingOrders.filter(order => order.email.toLowerCase().startsWith(email.toLowerCase().trim()));
    }

    if (phone) {
        searchingOrders = searchingOrders.filter(order => order.phone.startsWith(phone.trim()));
    }

    if (dateOfOrder) {
        searchingOrders = searchingOrders.filter(order => moment(new Date(order.createdAt)).format('MM/DD/YYYY') === moment(new Date(dateOfOrder)).format('MM/DD/YYYY'));
    }

    if (sendDate) {
        searchingOrders = searchingOrders.filter(order => moment(new Date(order.sendDate)).format('MM/DD/YYYY') === moment(new Date(sendDate)).format('MM/DD/YYYY'));
    }
    if (status && status !== 'all') {
        searchingOrders = searchingOrders.filter(order => order.status === status);
    }

    const totalItems = searchingOrders.length;

    if ( page || page === 0 ) {
        const limit = 8;
        let startIndex = page * limit
        let endIndex = (page + 1) * limit;
      
        searchingOrders = searchingOrders.slice(startIndex, endIndex)
    }

    return {searchingOrders, totalItems};
}

const changeOrderStatus = async (orderId, status) => {
    const orderToChange = await Order.findById(orderId);
    orderToChange.status = status;
    await orderToChange.save();
    return orderToChange;
}

module.exports = {
    getAllOrders,
    findOrderById,
    createOrder,
    searchOrders,
    changeOrderStatus,
}