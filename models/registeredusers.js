const mongoose = require("mongoose");

// Schema for registered users 
const registeredUserSchema = new mongoose.Schema({
    email : String,
    date : String,
    venue : String
})

// Model for registered users
module.exports = mongoose.model("RegisteredUser" , registeredUserSchema);