const mongoose = require("mongoose");

// Schema for registered users 
const registeredUserSchema = new mongoose.Schema({
    email : String,
    date : String,
    city : String
})

// Model for registered users
module.exports = mongoose.model("RegisteredUser" , registeredUserSchema);