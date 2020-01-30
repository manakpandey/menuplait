const mongoose = require('mongoose');

const { Schema } = mongoose;

const menuSchema = new Schema({
  _id: String,
  price: Number,
  veg: Boolean,
  outOfStock: Boolean,
  category: String,
});

module.exports = mongoose.model('menu', menuSchema);
