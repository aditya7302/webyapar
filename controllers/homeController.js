const homeUserLogin = async (req, res) => {
  try {
    res.render("user-login");
  } catch (error) {
    res.render("error", {
      status: 500,
      success: false,
      message: "Unable to Load User Login Page",
    });
  }
};

module.exports = {
  homeUserLogin,
};
