const { sanitizeBody } = require('express-validator');
const logger = require('../winston');
const Menu = require('../models/menu.model');
const Category = require('../models/menu.category.model');

exports.postAddMenuItem = [
  sanitizeBody('*').escape(),
  async (req, res) => {
    if (!req.user) {
      res.redirect('/admin/login');
      return;
    }
    const item = await Menu.findById(req.body.title);
    if (!item) {
      const menuItem = new Menu({
        _id: req.body.title,
        price: req.body.price,
        veg: req.body.veg,
        category: req.body.category,
      });
      menuItem.save((err) => {
        if (err) {
          logger.error(err);
        }
      });
    }
    res.redirect('/admin/menu');
  },
];

exports.modifyMenuItem = [
  sanitizeBody('*').escape(),
  async (req, res) => {
    if (!req.user) {
      res.redirect('/admin/login');
      return;
    }
    const item = await Menu.findById(req.body.title);
    item.price = req.body.price;
    item.veg = req.body.veg;
    item.category = req.body.category;
    item.save((err) => {
      if (err) {
        logger.error(err);
        return;
      }
      res.redirect('/admin/menu');
    });
  },
];

exports.addCategory = [
  sanitizeBody('*').escape(),
  async (req, res) => {
    if (!req.user) {
      res.redirect('/admin/login');
      return;
    }
    const category = new Category({
      title: req.body.name,
    });
    category.save((err) => {
      if (err) {
        logger.error(err);
        return;
      }
      res.redirect('/admin/menu');
    });
  },
];
