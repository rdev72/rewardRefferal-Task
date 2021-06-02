const mongoose = require('mongoose');

// money of user
const walletSchema = mongoose.Schema(
  {
    amount: { type: Number, default: 0, require: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    userName: { type: String, require: true } //for development ease / can be removed in production mode
  },
  { versionKey: false }
);

module.exports = mongoose.model('wallet', walletSchema);
