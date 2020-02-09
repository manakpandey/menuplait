const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  custName: String,
  custNumber: Number,
  amt: Number,
  items: {
    itemId: [String],
    quantity: [Number],
    price: [Number],
  },
  placed: {
    type: Boolean,
    default: false,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  payType: {
    type: String,
    enum: ['cash', 'paytm', 'gpay'],
  },
  token: Number,
}, {
  timestamps: true,
});

module.exports = mongoose.model('order', orderSchema);
