const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  custName: String,
  custNumber: Number,
  amt: Number,
  items: {
    itemId: [String],
    quantity: [Number],
  },
  placed: {
    type: Boolean,
    default: false,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('order', orderSchema);
