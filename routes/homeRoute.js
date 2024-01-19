const express = require("express");
const {
  homeUserLogin,
  homeAdminLogin,
} = require("../controllers/homeController");

//router object
const router = express.Router();

router.get("/", homeUserLogin);



module.exports = router;
