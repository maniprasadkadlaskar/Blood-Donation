const express = require("express");
const controller = require("../controllers");
const { auth } = require("../middleware");
const router = express.Router();

// Server routes
router.get("/" , auth , controller.authorizeUser);
router.post("/signin" , controller.validateUser);
router.post("/signup" , controller.addUser);
router.post("/register" , auth , controller.registerUser);
router.post("/donate" , auth , controller.donateRegister);
router.get("/user" , auth , controller.getUser);
router.get("/user/registrations" , auth , controller.getRegistration);
router.post("/user/edit" , auth , controller.updateUser);

module.exports = router;