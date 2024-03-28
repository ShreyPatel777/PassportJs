require('dotenv').config();

const mongoose = require('mongoose');

const bcrypt = require("bcrypt");
const bcryptjs =  require('bcryptjs');

const signupSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    email : {
        type :String,
        require :true
    },
    password : {
        type : String,Number,
        require : true
    },
    tokens:[{
        token:{
            type : String,
            require : true
        }
    }]
});

signupSchema.pre("save", async (next) => {
    this.password = await bcrypt.hash(this.password,10);
    next();
})

const Signup = new mongoose.model("Signup",signupSchema);

module.exports = Signup;
