const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SERVICES_Schema = new Schema({
    image: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    desc: {
        type: String,
        required: true,
        trim: true
    }
    // category:{
    //     type :String,
    //     required : true,
    //     trim:true
    // }
//     price_ref:{
//         type : Schema.Types.ObjectId,
//         ref: 'Price',
//         required: true
//    }
});

const SERVICES = mongoose.model("services", SERVICES_Schema);
module.exports = SERVICES;