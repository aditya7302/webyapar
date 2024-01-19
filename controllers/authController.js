const adminModel = require("../models/adminModel");
const userModel = require("../models/userModel");
const { getAllUsers } = require("./userController");

const userLogin = async (req, res) => {
  try {
    const { userID, password } = req.body;
    if (!userID || !password) {
      res.render("user-login");
    }
    const user = await userModel.findOne({ userID });
    if (!user) {
      res.render("error", {
        status: 404,
        success: false,
        message: "User Not found",
      });
    } else if (password === user.password) {
      res.render("userDashboard", {
        userID,
        photo: user.photo,
        name: user.name,
        password: user.password,
        status: user.updatesApproved
      });
    } else {
      res.render("error", {
        status: 404,
        success: false,
        message: "Invalid Password",
      });
    }
  } catch (error) {
    res.render("error", {
      status: 500,
      success: false,
      message: "User Login Failed",
    });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email,password);
    if (!email || !password) {
      res.render("admin-login");
    }
    const admin = await adminModel.findOne({ email });
    if (!admin) {
      res.render("error", {
        status: 404,
        success: false,
        message: "Admin Not found",
      });
    } else if (password === admin.password) {
        const users = await getAllUsers(req,res);
      res.render("adminDashboard", {
        email,
        name: admin.name,
        users
      });
    } else {
      res.render("error", {
        status: 404,
        success: false,
        message: "Invalid Password",
      });
    }
  } catch (error) {
    res.render("error", {
      status: 500,
      success: false,
      message: "Admin Login Failed",
    });
  }
};

module.exports = {
  userLogin,
  adminLogin,
};
