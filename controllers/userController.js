const userModel = require("../models/userModel");

//get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    return users;
  } catch (error) {
    res.render("error", {
      status: 500,
      success: false,
      message: "Unable to Get All Users",
    });
  }
};

//create user
const createUser = async (req, res) => {
  try {
    const { password, adminName, adminToken } = req.body;
    const currentSize = await userModel.countDocuments({});
    const newUserID = currentSize + 1;
    const newUser = new userModel({
      userID: newUserID,
      password,
    });
    await newUser.save();
    const users = await getAllUsers(req, res);
    const email = adminToken;
    const name = adminName;
    res.render("adminDashboard", {
      users,
      email,
      name,
    });
  } catch (error) {
    console.log(error);
    res.render("error", {
      status: 500,
      success: false,
      message: "Unable to Create User",
    });
  }
};

//update user
const updateUser = async (req, res) => {
  try {
    const { userID, name } = req.body;
    const { buffer } = req.file;
    const user = await userModel.findOne({ userID });

    if (!user) {
      res.render("error", {
        status: 404,
        success: false,
        message: "User Not found",
      });
      return;
    }

    user.pendingUpdates = {
      photo: buffer,
      name,
    };
    user.updatesApproved = false;
    await user.save();

    res.render("userDashboard", {
      status: user.updatesApproved,
      userID,
      photo: user.photo,
      name,
      password: user.password,
    });
  } catch (error) {
    console.log(error);
    res.render("error", {
      status: 500,
      success: false,
      message: "Unable to Update User",
    });
  }
};

//delete user
const deleteUser = async (req, res) => {
  try {
    const { userID, adminName, adminToken } = req.body;
    await userModel.findOneAndDelete({ userID });
    const users = await getAllUsers(req, res);
    const email = adminToken;
    const name = adminName;
    res.render("adminDashboard", {
      users,
      email,
      name,
    });
  } catch (error) {
    console.log(error);
    res.render("error", {
      status: 500,
      success: false,
      message: "Unable to Delete User",
    });
  }
};

//revert to default
const defaultUser = async (req, res) => {
  try {
    const { userID, adminName, adminToken } = req.body;
    // console.log(userID,adminName,adminToken);
    await userModel.findOneAndUpdate(
      { userID },
      {
        $set: {
          photo: "../assets/default/default.webp",
          name: "_",
          updatesApproved: false,
        },
      }
    );

    const users = await getAllUsers(req, res);
    const email = adminToken;
    const name = adminName;
    res.render("adminDashboard", {
      users,
      email,
      name,
    });
  } catch (error) {
    res.render("error", {
      status: 500,
      success: false,
      message: "Unable to Revert User",
    });
  }
};

//update status
const updateStatus = async (req, res) => {
  try {
    const { adminName, adminToken, userID, isApproved } = req.body;
    const user = await userModel.findOne({ userID });
    if (!isApproved) {
      user.pendingUpdates = {};
      user.updatesApproved = false;
    } else {
      user.photo = user.pendingUpdates.photo;
      user.name = user.pendingUpdates.name;
      user.updatesApproved = isApproved;
      user.pendingUpdates = {};
    }

    await user.save();

    const users = await getAllUsers(req, res);
    const email = adminToken;
    const name = adminName;
    res.render("adminDashboard", {
      users,
      email,
      name,
    });
  } catch (error) {
    console.log(error);
    res.render("error", {
      status: 500,
      success: false,
      message: "Unable to Approve Update Status",
    });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
  defaultUser,
  updateStatus,
};
