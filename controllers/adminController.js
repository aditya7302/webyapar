const homeAdminLogin = async (req, res) => {
  try {
    res.render("admin-login");
  } catch (error) {
    res.render("error", {
      status: 500,
      success: false,
      message: "Unable to Load Admin Login Page",
    });
  }
};

module.exports = {
  homeAdminLogin,
};
