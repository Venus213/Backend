const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NAIL_Schema = new Schema({
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

const NAIL = mongoose.model("nail", NAIL_Schema);
module.exports = NAIL;