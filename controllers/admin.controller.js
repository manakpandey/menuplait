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
