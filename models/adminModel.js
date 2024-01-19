const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    name:{
        type: String,
        required: true,
    },
    email:{
        type:String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: Number,
        default: 2,
        required: true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Admin", adminSchema);
