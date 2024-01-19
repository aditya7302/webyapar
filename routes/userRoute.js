const express = require("express");
const {
  createUser,
  updateUser,
  deleteUser,
  defaultUser,
  updateStatus,
} = require("../controllers/userController");
const multer = require("multer");

const storage = multer.memoryStorage(); // This stores the file in memory
const upload = multer({ storage: storage });

//router object
const router = express.Router();

//create user
router.post("/create-user", createUser);

//update user
router.post("/update-user", upload.single("photo"), updateUser);

//delete user
router.post("/delete-user", deleteUser);

//default user
router.post("/default", defaultUser);

//approved status
router.post("/update-status", updateStatus);

module.exports = router;
