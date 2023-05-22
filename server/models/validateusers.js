const mongoose = require("mongoose");

// Schema for validated users 
const validateUserSchema = new mongoose.Schema({
    email : String,
    password : String
})

// Model for validated users 
module.exports = mongoose.model("ValidateUsers" , validateUserSchema);