const { sanitizeBody } = require('express-validator');
const logger = require('../winston');

exports.getDashboard = (req, res) => {
  if (!req.user) {
    res.redirect('/admin/login');
    return;
  }
  res.render('admin');
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
