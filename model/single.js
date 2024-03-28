const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SINGLE_Schema = new Schema({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    desc: {
        type: String,
        required: true,
        trim: true
    }
});

const SINGLE = mongoose.model("single", SINGLE_Schema);
module.exports = SINGLE;
