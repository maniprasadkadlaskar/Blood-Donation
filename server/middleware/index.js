const jwt = require("jsonwebtoken");
require('dotenv').config();

// Authorization of users 
module.exports.auth = (req , res , next) => {
    const token = req.headers.authorization
    const secret = process.env.JWT_SECRET;

    if(token) {
        jwt.verify(token , secret , (err , decodedToken) => {
            if(err)
                res.status(401).json({
                    message : "Invalid token"
                })
            else {
                req.decodedToken = decodedToken
                next()
            }
        })
    }
    else
        res.status(401).json({
            message : "No token received"
        })
}