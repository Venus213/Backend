const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PRICE_Schema = new Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
});

const PRICE = mongoose.model("price", PRICE_Schema);
module.exports = PRICE;
