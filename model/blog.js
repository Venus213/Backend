const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BLOG_Schema = new Schema({
  image: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  desc: {
    type: String,
    required: true,
    trim: true,
  },
});

const BLOG = mongoose.model("blog", BLOG_Schema);
module.exports = BLOG;
