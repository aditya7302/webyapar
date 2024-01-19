const express = require('express');
const { homeAdminLogin } = require('../controllers/adminController');

//router object
const router = express.Router();

router.get("/login", homeAdminLogin);

module.exports = router;