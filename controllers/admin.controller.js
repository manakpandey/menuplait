const { sanitizeBody } = require('express-validator');
const logger = require('../winston');
const Menu = require('../models/menu.model');

exports.getDashboard = (req, res) => {
  if (!req.user) {
    res.redirect('/admin/login');
    return;
  }
  Menu.find({}, (err, menu) => {
    if (err) {
      logger.error(err);
    }
    res.render('admin', { menu });
  });
};

exports.postAddMenuItem = [
  sanitizeBody('*').escape(),
  (req, res) => {
    const menuItem = new Menu({
      _id: req.body.title,
      price: req.body.price,
      veg: req.body.veg,
      category: req.body.category,
    });
    menuItem.save((err) => {
      if (err) {
        logger.error(err);
        return;
      }
      res.redirect('/admin');
    });
  },
];
