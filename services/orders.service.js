const Order = require("../models/Order");

const getAllOrders = async () => {
    const orders = await Order.find().populate('products');
    return orders;
};

const findOrderById = async (orderId) => {
    const order = await Order.findById(orderId).populate('products');
    return order;
}

const createOrder = async  (newOrder) => {
    const createdOrder = await new Order(newOrder);
    await createdOrder.save();
    return createdOrder;
}

const searchOrders = async (orderId, email, fromDateOfOrder, toDateOfOrder, fromSendDate, toSendDate, status ) => {
    let searchingOrders = await Order.find().lean();

    if (orderId) {
        searchingOrders = searchingOrders.filter(order => order.orderId.includes(orderId));
    }

    if (email) {
        searchingOrders = searchingOrders.filter(order => order.email.toLowerCase().startsWith(email.toLowerCase()));
    }

    if (fromDateOfOrder) {
        searchingOrders = searchingOrders.filter(order => order.createdAt >= fromDateOfOrder);
    }
    if (toDateOfOrder) {
        searchingOrders = searchingOrders.filter(order => order.createdAt <= toDateOfOrder);
    }
    if (fromSendDate) {
        searchingOrders = searchingOrders.filter(order => order.sendDate >= fromSendDate);
    }
    if (toSendDate) {
        searchingOrders = searchingOrders.filter(order => order.sendDate <= toSendDate);
    }
    if (status) {
        searchingOrders = searchingOrders.filter(order => order.status === status);
    }

    return searchingOrders;
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
    changeOrderStatus
}