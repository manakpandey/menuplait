const { sanitizeBody } = require('express-validator');
const Order = require('../models/order.model');
const Menu = require('../models/menu.model');
const Category = require('../models/menu.category.model');

exports.getDashboard = async (req, res) => {
  if (!req.user) {
    res.redirect('/admin/login');
    return;
  }
  const orders = await Order.find({ placed: true, completed: false });
  res.render('adminDashboard', { orders });
};

exports.getAlterMenu = async (req, res) => {
  if (!req.user) {
    res.redirect('/admin/login');
    return;
  }
  const menu = await Menu.find({});
  const categories = await Category.find({});
  res.render('alterMenu', { menu, categories });
};

exports.markAsComplete = [
  sanitizeBody('*').escape(),
  async (req, res) => {
    const order = await Order.findById(req.body.orderId);
    order.completed = true;
    order.save();
    res.redirect('/admin');
  },
];

exports.getOrderHistory = async (req, res) => {
  if (!req.user) {
    res.redirect('/admin/login');
    return;
  }
  const orders = await Order.find({ completed: true });
  res.render('orderHistory', { orders });
};

exports.getIncompleteOrders = async (req, res) => {
  if (!req.user) {
    res.redirect('/admin/login');
    return;
  }
  const orders = await Order.find({ placed: false });
  res.render('incompleteOrders', { orders });
};
