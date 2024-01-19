const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const path = require("path");
const multer = require("multer");


const storage = multer.memoryStorage(); 

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, 
  },
});

dotenv.config();

//database
connectDB();

//rest object
const app = express();
app.use(express.urlencoded({ extended: false }));

//view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middlewares
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/test", require("./routes/testRoute"));
app.use("/auth", require("./routes/authRoute"));
app.use("/user", require("./routes/userRoute"));
app.use("/admin", require("./routes/adminRoute"));
app.use("/", async (req, res) => {
  try {
    res.render("user-login");
  } catch (error) {
    res.render("error", {
      status: 500,
      success: false,
      message: "Unable to Load Login Page",
    });
  }
});

const PORT = process.env.PORT || 8080;

//server
app.listen(PORT, () => {
  console.log(
    `Server is running at ${PORT} in ${process.env.DEVELOPMENT} mode`.bgBlue
  );
});
