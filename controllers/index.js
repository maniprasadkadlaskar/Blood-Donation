const bcrypt = require("bcrypt");
const Users = require("../models/users");
const validateUsers = require("../models/validateUsers");
const RegisteredUser = require("../models/registeredusers");
const { generateToken } = require("../utils");

// To get all registered users 
module.exports.getUsers = async (req , res) => {
    try {
        const users = await Users.find();
        res.status(200).json({
            users : users
        })
    }
    catch (err) {
        res.status(500).json({
            message : err.message
        })
    }
}

// To register new user 
module.exports.addUser = async (req , res) => {
    try {
        const userExist = await validateUsers.find({email : req.body.email});

        if(userExist.length !== 0)
            throw new Error("user email already exist");

        const hashedPassword = await bcrypt.hash(req.body.password , 10);

        const validUser = new validateUsers({
            email : req.body.email,
            password : hashedPassword
        })

        const register = new Users({
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            bod : req.body.bod,
            weight : req.body.weight,
            bg : req.body.bg,
            gender : req.body.gender,
            street : req.body.street,
            area : req.body.area,
            city : req.body.city,
            pincode : req.body.pincode,
            mobile : req.body.mobile,
            email : req.body.email
        });

        const validatedUser = await validUser.save();
        const registeredUser = await register.save();

        res.status(200).json({
            message : "user registered"
        })
    }
    catch (err) {
        res.status(400).json({
            message : err.message
        })
    }
}

// To validate registered user 
module.exports.validateUser = async (req , res) => {
    try {
        const userExist = await validateUsers.findOne({ email : req.body.email });

        if(userExist === null) 
            throw new Error("invalid email");

        if(await bcrypt.compare(req.body.password , userExist.password)) {

            const token = generateToken(userExist.email);

            res.status(200).json({
                email : userExist.email,
                message : "user validated",
                token
            })
        }
        else {
            throw new Error("inavlid password")
        }
    }
    catch (err) {
        res.status(400).json({
            message : err.message
        })
    }
}

// To register new user 
module.exports.registerUser = async (req , res) => {
    try {
        const user = RegisteredUser({
            email : req.body.email,
            venue : req.body.venue,
            date : req.body.date
        })

        const registeredUser = await user.save();
        
        res.status(200).json({
            message : "user registered"
        })
    }
    catch (err) {
        res.status(400).json({
            message : err.message
        })
    }
}

// To authorize users 
module.exports.authorizeUser = (req , res ) => {
    res.status(200).json({
        message : "user authorized",
        decodedToken : req.decodedToken
    })
}