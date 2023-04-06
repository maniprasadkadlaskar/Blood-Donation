const mongoose = require("mongoose");

// Schema for users 
const userSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    bod : String,
    weight : String,
    bg : String,
    gender : String,
    street : String,
    area : String,
    city : String,
    pincode : String,
    mobile : String,
    email : String
})

// Model for users 
module.exports = mongoose.model("Users" , userSchema);