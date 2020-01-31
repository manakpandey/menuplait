const { sanitizeBody } = require('express-validator');
const logger = require('../winston');
const Menu = require('../models/menu.model');

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
    Object.keys(req.body).forEach((key) => {
      logger.debug(req.body[key]);
    });
    res.render('okay');
  },
];
