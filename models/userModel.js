const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");


// Construct the absolute path to the default photo
const defaultPhotoPath = path.join(__dirname, "../assets/default.webp");

// Read the default photo file and convert it to a Buffer
const defaultPhotoData = fs.readFileSync(defaultPhotoPath);

const userSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: Buffer,
      contentType: String,
      default: defaultPhotoData,
    },
    name: {
      type: String,
      required: true,
      default: "_",
    },
    role: {
      type: Number,
      required: true,
      default: 1,
    },
    pendingUpdates: {
      type: Object,
      default: {},
    },
    updatesApproved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", userSchema);
