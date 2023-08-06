const bcrypt = require("bcrypt");
const Users = require("../models/users");
const LoggedUsers = require("../models/loggedusers");
const Registrations = require("../models/registrations");
const { generateToken } = require("../utils");

// To get number of registrations 
module.exports.getTotalRegistrations = async (req , res) => {
    try {
        const count = await Registrations.countDocuments({});

        res.status(200).json({
            registrations: count,
            message: "number of donation registrations"
        });
    }
    catch(e) {
        res.status(500).json({
            message: err.message
        })
    }
}

// To get user 
module.exports.getUser = async (req , res) => {
    try {
        const user = await Users.findOne({ email : req.query.email });
        
        if(user == null)
            throw new Error("Invalid user");

        res.status(200).json({
            user : user,
            message : "valid registered user"
        });
    }
    catch(err) {
        res.status(400).json({
            message: err.message
        })
    }
}

// To get user registrations 
module.exports.getRegistration = async (req , res) => {
    try {
        const registrations = await Registrations.find({ email : req.query.email });

        res.status(200).json({
            registrations : registrations,
            message : "valid registered user"
        });
    }
    catch(err) {
        res.status(400).json({
            message: err.message
        });
    }
}

// To save user
module.exports.addUser = async (req, res) => {
    try {
        const userExist = await LoggedUsers.find({ email: req.body.email });

        if (userExist.length !== 0)
            throw new Error("user email already exist");

        const passwordPattern = /^(?=.*[a-zA-Z]+)(?=.*[0-9]+)(?=.*[$@%!]+).{8,}$/;

        if(!passwordPattern.test(req.body.password))
            throw new Error("Minimum length of password must be 8.\nPassword must contain atleast 1 character , digit and special character ($ % ! @)\n.Character followed by digits then special character.");

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

        if (user.length !== 0)
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

// To update user 
module.exports.updateUser = async (req , res) => {
    try {
        const user = await Users.findOne({ email: req.body.email });

        if (user == null)
            throw new Error("Invalid user");

        await Users.updateOne({ email: req.body.email } , req.body);

        res.status(200).json({
            message: "user updated successfully"
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

        if (await bcrypt.compare(req.body.password, user.password)) {

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
        const user = await Users.findOne({ email: req.body.email });

        if (user === null)
            throw new Error("User not registered");

        const register = Registrations({
            email: req.body.email,
            city: req.body.city,
            date: req.body.date
        })

        await register.save();

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

// To authorize user
module.exports.authorizeUser = async (req, res) => {
    const userExist = await Users.exists({ email: req.decodedToken.email });

    res.status(200).json({
        message: "user authorized",
        access_token: { 
            ...req.decodedToken,
            isRegistered : userExist
        }
    })
}