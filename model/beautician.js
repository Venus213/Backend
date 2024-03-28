const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BEAUTICIAN_Schema = new Schema({
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

const BEAUTICIAN = mongoose.model("beautician", BEAUTICIAN_Schema);
module.exports = BEAUTICIAN;