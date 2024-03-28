const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SIGNUP_Schema = new Schema({
    
    username: {
        type: String,
        required: true,
        trim:true
    },
    
    email: {
        type: String,
        required: true,
        trim:true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim:true
    },
    mno: {
        type: Number,
        required: true,
        maxlength:10,
        trim:true
      }
});

const SIGNUP = mongoose.model("signup", SIGNUP_Schema);
module.exports = SIGNUP;
