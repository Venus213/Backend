const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OFFER_Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: String,
    required: true,
    trim: true
  },
  desc: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true,
  },
});

const OFFER = mongoose.model("offer", OFFER_Schema);
module.exports = OFFER;
