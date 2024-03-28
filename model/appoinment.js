const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const APPOINMENT_Schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    services: {
        type: String,
        required: true,
        trim: true
    },
    beautician: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true,
        trim: true
    },
    desc: {
        type: String,
        required: true,
        trim: true
    }
});

const APPOINMENT = mongoose.model("appoinment", APPOINMENT_Schema);
module.exports = APPOINMENT;