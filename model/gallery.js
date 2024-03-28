const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GALLERY_Schema = new Schema({
    image: {
        type: String,
        required: true
    },
    // token:{
    //     type :String ,
    //     required: true
    // }
    category:{
        type:String,
        required: true,
        trim: true
    }
});

const GALLERY = mongoose.model("gallery", GALLERY_Schema);
module.exports = GALLERY;
