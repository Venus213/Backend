const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CLIENT_Schema = new Schema({
    image: {
        type: String,
        required: true
    },
    desc: {
        type:String,
        required: true,
        trim:true
    },
    name: {
        type: String,
        required: true,
        trim:true
    },
    profession: {
        type: String,
        required: true,
        trim:true
    }
});

const CLIENT = mongoose.model("client", CLIENT_Schema);
module.exports = CLIENT;
