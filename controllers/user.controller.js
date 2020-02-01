const { sanitizeBody } = require('express-validator');
const logger = require('../winston');
const Menu = require('../models/menu.model');
const Order = require('../models/order.model');

exports.getMenu = (req, res) => {
  Menu.find({}, (err, menu) => {
    if (err) {
      logger.error(err);
      return;
    }
    res.render('index', { menu });
  });
};

exports.postOrder = [
  sanitizeBody('*').escape(),
  (req, res) => {
    Menu.find({}, (err, menu) => {
      if (err) {
        logger.error(err);
        return;
      }
      const items = [];
      const quants = [];
      let amt = 0;
      for (let i = 0; i < menu.length; i += 1) {
        if (req.body[`quan${i}`] !== '0') {
          const item = menu[i];
          const quantity = parseInt(req.body[`quan${i}`], 8);
          items.push(item.id);
          quants.push(quantity);
          amt += menu[i].price * quantity;
        }
      }
      const order = new Order({
        custName: req.body.username,
        custNumber: req.body.userNum,
        amt,
        items: {
          itemId: items,
          quantity: quants,
        },
      });

      order.save((error) => {
        logger.error(error);
      });
    });
    res.render('okay');
  },
];
