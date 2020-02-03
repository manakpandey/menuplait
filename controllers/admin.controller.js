const logger = require('../winston');
const Order = require('../models/order.model');
const Menu = require('../models/menu.model');

exports.getDashboard = (req, res) => {
  if (!req.user) {
    res.redirect('/admin/login');
    return;
  }
  Order.find({ placed: true }, (err, orders) => {
    if (err) {
      logger.error(err);
    }
    res.render('adminDashboard', { orders });
  });
};

exports.getAlterMenu = (req, res) => {
  if (!req.user) {
    res.redirect('/admin/login');
    return;
  }
  Menu.find({}, (err, menu) => {
    if (err) {
      logger.error(err);
    }
    res.render('alterMenu', { menu });
  });
};
