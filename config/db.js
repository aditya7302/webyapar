const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to ${mongoose.connection.host} Database`.bgMagenta);
  } catch (error) {
    console.log(`There has been error in connecting to the database`.bgRed);
    console.log(error);
  }
};

module.exports = connectDB;
