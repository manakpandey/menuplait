const mongoose = require('mongoose');

const { Schema } = mongoose;

const menuCategorySchema = new Schema({
  title: String,
});

module.exports = mongoose.model('menuCategory', menuCategorySchema);
