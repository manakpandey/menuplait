const { sanitizeBody } = require('express-validator');
const logger = require('../winston');
const Menu = require('../models/menu.model');

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

exports.modifyMenuItem = [
  sanitizeBody('*').escape(),
  async (req, res) => {
    const item = await Menu.findById(req.body.title);
    item.price = req.body.price;
    if (req.body.veg === '1') {
      item.veg = true;
    } else {
      item.veg = false;
    }
    item.category = req.body.category;
    item.save((err) => {
      if (err) {
        logger.error(err);
        return;
      }
      res.redirect('/admin');
    });
  },
];
