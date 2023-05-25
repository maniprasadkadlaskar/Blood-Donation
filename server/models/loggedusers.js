const mongoose = require("mongoose");

// Schema for validated users 
const loggedUserSchema = new mongoose.Schema({
    email : String,
    password : String
})

// Model for validated users 
module.exports = mongoose.model("loggedUsers" , loggedUserSchema);