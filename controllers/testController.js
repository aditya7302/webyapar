const testController = async (req, res) => {
  try {
    res.render("test", {
      status: 200,
      success: true,
      message: "Test Route Successfull",
    });
  } catch (error) {
    res.render("error", {
      status: 500,
      success: false,
      message: "Test Route Failed",
    });
  }
};

module.exports = {
  testController,
};
