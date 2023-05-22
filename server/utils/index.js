const jwt = require("jsonwebtoken");
require('dotenv').config();

// To generate JWT token for authorization
module.exports.generateToken = user => {
    const payload = {
        email : user
    }

    const secret = process.env.JWT_SECRET;

    const options = {
        expiresIn : '1d'
    }

    return jwt.sign(payload , secret , options)
}