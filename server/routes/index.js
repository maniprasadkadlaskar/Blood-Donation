const express = require("express");
const controller = require("../controllers");
const { auth } = require("../middleware");
const router = express.Router();

// Server routes
router.get("/" , auth , controller.authorizeUser);
// router.get("/users" , controller.getUsers);
router.post("/signin" , controller.validateUser);
router.post("/signup" , controller.addUser);
router.post("/register" , controller.registerUser);
router.post("/donate" , controller.donateRegister);

module.exports = router;