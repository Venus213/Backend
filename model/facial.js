const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FACIAL_Schema = new Schema({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    // token:{
    //     type :String ,
    //     required: true
    // }
});

const FACIAL = mongoose.model("facial", FACIAL_Schema);
module.exports = FACIAL;