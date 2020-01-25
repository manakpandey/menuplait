const mongoose = require('mongoose');

const { Schema } = mongoose;

const txnSchema = new Schema({
  orderId: String,
  payType: {
    type: String,
    enum: ['cash', 'paytm', 'gpay'],
  },
  status: {
    type: String,
    enum: ['pending', 'complete'],
  },
});

module.exports = mongoose.model('txn', txnSchema);
