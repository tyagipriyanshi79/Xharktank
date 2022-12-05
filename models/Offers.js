const mongoose = require("mongoose");

const OfferSchema = new mongoose.Schema({
  investor: String,
  amount: Number,
  equity: Number,
  comment: String,
});

OfferSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Offers", OfferSchema);
