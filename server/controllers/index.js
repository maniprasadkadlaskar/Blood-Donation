const bcrypt = require("bcrypt");
const Users = require("../models/users");
const LoggedUsers = require("../models/loggedusers");
const RegisteredUser = require("../models/registeredusers");
const { generateToken } = require("../utils");

// To get all registered users 
// module.exports.getUsers = async (req, res) => {
//     try {
//         const users = await Users.find();
//         res.status(200).json({
//             users: users
//         })
//     }
//     catch (err) {
//         res.status(500).json({
//             message: err.message
//         })
//     }
// }

// To save user
module.exports.addUser = async (req, res) => {
    try {
        const userExist = await LoggedUsers.find({ email: req.body.email });

        if (userExist.length !== 0)
            throw new Error("user email already exist");

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = new LoggedUsers({
            email: req.body.email,
            password: hashedPassword
        })

        
        await user.save();
    
        res.status(200).json({
            message: "user signedup successfully"
        })
    }
    catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

// To register user 
module.exports.registerUser = async (req, res) => {
    try {
        const user = await Users.find({ email: req.body.email });

        if (user.length == 0)
            throw new Error("user already registered");

        const register = new Users(req.body);

        await register.save();

        res.status(200).json({
            message: "user registered successfully"
        })
    }
    catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

// To validate user 
module.exports.validateUser = async (req, res) => {
    try {
        const user = await LoggedUsers.findOne({ email: req.body.email });

        if (user === null)
            throw new Error("Invalid email");

        if (bcrypt.compare(req.body.password, user.password)) {

            const token = generateToken(user.email);

            res.status(200).json({
                email: user.email,
                message: "user validated",
                access_token : token
            })
        }
        else {
            throw new Error("Inavlid password")
        }
    }
    catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

// To register for donation  
module.exports.donateRegister = async (req, res) => {
    try {
        const user = RegisteredUser({
            email: req.body.email,
            city: req.body.city,
            date: req.body.date
        })

        await user.save();

        res.status(200).json({
            message: "user registered for donation"
        })
    }
    catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

// To authorize users 
module.exports.authorizeUser = (req, res) => {
    res.status(200).json({
        message: "user authorized",
        access_token: req.decodedToken
    })
}