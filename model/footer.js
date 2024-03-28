const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FOOTER_Schema = new Schema({
    email: {
        type: String,
        required: true,
        trim:true
    }
});

const FOOTER = mongoose.model("footer", FOOTER_Schema);
module.exports = FOOTER;
