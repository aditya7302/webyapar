const express = require("express");
const { userLogin, adminLogin } = require("../controllers/authController");

//router object
const router = express.Router();

//user login
router.post("/user-login", userLogin);

//admin login
router.post("/admin-login", adminLogin);


module.exports = router;
