const errors = require('../errors/errors');
const ordersService = require('../services/orders.service');
const { validationResult } = require("express-validator");

const getAllOrders = async (req, res) => {
    try {
        res.status(201).json(await ordersService.getAllOrders());
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOrder = async (req,res) => {
    try {
        const order = await ordersService.findOrderById(req.params.id);
        if (!order) res.status(404).json({ message: errors.CANNOT_FIND_ORDER });
        else return res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



const createOrder = async (req, res) => {
    if (validationResult(req).length > 0) return res.status(400).json(validationResult(req));

    try {
        const { name, surname, email, products, deliveryAddress, status, sendDate, paymentId,phone } = req.body;
        const newOrder = await ordersService.createOrder({
            name, surname, email, products, deliveryAddress, status, sendDate, paymentId, phone
        });
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const searchOrder = async (req, res) => {
    const { orderId, email, dateOfOrder, sendDate, status, phone, page } = req.body;
    res.json(await ordersService.searchOrders(orderId, email, dateOfOrder, sendDate, status, phone, page));
}

const changeOrderStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const {status}  = req.body;
        console.log(req.body)
        const order = await ordersService.changeOrderStatus(id, status);
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllOrders,
    getOrder,
    createOrder,
    searchOrder,
    changeOrderStatus,
}