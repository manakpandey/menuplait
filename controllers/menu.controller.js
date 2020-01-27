const { sanitizeBody } = require('express-validator');
const logger = require('../winston');

const menuT = [['Food 1', '200', true], ['Food 2', '180', true], ['Food 3', '210', false], ['Food 4', '500', true], ['Food 5', '99', true]];

exports.getMenu = (req, res) => {
  res.render('index', { menu: menuT });
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
