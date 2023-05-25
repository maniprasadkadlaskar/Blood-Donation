const mongoose = require("mongoose");

// Schema for user
const personalSchema = new mongoose.Schema({
    firstname : String,
    lastname : String,
    dob : String,
    gender : String,
    bg : String,
    weight : String,
    mobile : String,
})

const addressSchema = new mongoose.Schema({
    area : String,
    city : String,
    pincode : String,
    state : String,
    country : String
})

const userSchema = new mongoose.Schema({
    email : String,
    personal : { type : personalSchema },
    address : { type : addressSchema }
})

// Model for users 
module.exports = mongoose.model("Users" , userSchema);