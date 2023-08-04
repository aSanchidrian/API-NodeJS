const express = require("express");
const router = express.Router();
const { validatorRegister, validatorLogin } = require("../validators/auth");
const { registerUser, loginUser } = require("../controllers/auth");

// http://localhost:3001/api/auth/login
router.post("/login", validatorLogin, loginUser);

// http://localhost:3001/api/auth/register
router.post("/register", validatorRegister, registerUser);

module.exports = router;
