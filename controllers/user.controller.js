const { sanitizeBody } = require('express-validator');
const logger = require('../winston');
const Menu = require('../models/menu.model');
const Order = require('../models/order.model');
const Category = require('../models/menu.category.model');

exports.getMenu = async (req, res) => {
  const menu = await Menu.find({});
  const category = await Category.find({});

  res.render('index', { menu, category });
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
      const price = [];
      let amt = 0;
      for (let i = 0; i < menu.length; i += 1) {
        if (req.body[`quan${i}`] !== '0') {
          const item = menu[i];
          const quantity = parseInt(req.body[`quan${i}`], 8);
          items.push(item.id);
          quants.push(quantity);
          price.push(menu[i].price);
          amt += menu[i].price * quantity;
        }
      }
      let placed = true; // for until no payment gateway
      logger.debug(req.body.pType);
      if (req.body.ptype === 'cash') placed = false; // for until no payment gateway
      logger.debug(placed);
      const order = new Order({
        custName: req.body.username,
        custNumber: req.body.userNum,
        amt,
        items: {
          itemId: items,
          quantity: quants,
          price,
        },
        payType: req.body.pType,
        placed, // for until no payment gateway
      });

      order.save((error) => {
        if (error) {
          logger.error(`Error saving order: ${error}`);
        }
      });
    });
    if (req.body.pType === 'cash') {
      res.render('orderCashPay');
    } else {
      res.render('orderPlaced');
    }
  },
];

exports.getUserOrders = (req, res) => {
  res.render('userOrders');
};

exports.postUserOrders = [
  sanitizeBody('*').escape(),
  (req, res) => {
    Order.find({ custName: req.body.custName, custNumber: req.body.custNumber }, (err, orders) => {
      if (err) {
        logger.error(`Error finding customer orders: ${err}`);
        return;
      }
      logger.debug(orders);
      res.render('userOrdersResult', { orders });
    });
  },
];
