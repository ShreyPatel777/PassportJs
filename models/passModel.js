require('dotenv').config();

const mongoose = require('mongoose');

const bcrypt = require("bcrypt");
const bcryptjs =  require('bcryptjs');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    username : {
        type :String,
        require :true
    },
    password : {
        type : String,Number,
        require : true
    },
});

const User = new mongoose.model("User",userSchema);

module.exports = User;
