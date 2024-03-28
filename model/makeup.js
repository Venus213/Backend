const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MAKEUP_Schema = new Schema({
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

const MAKEUP = mongoose.model("makeup", MAKEUP_Schema);
module.exports = MAKEUP;