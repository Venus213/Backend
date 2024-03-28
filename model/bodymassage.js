const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BODYMASSAGE_Schema = new Schema({
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

const BODYMASSAGE = mongoose.model("bodymassage", BODYMASSAGE_Schema);
module.exports = BODYMASSAGE