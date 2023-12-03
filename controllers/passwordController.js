const asyncHandler = require("express-async-handler");
const { User } = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * @desc Get Forgot password view
 * @route /password/forgot-password
 * @method GET
 * @access Public
 */

module.exports.getForgotPasswordView = asyncHandler((req, res) => {
  res.render("forgot-password");
});

/**
 * @desc Send Forgot password Link
 * @route /password/forgot-password
 * @method POST
 * @access Public
 */

module.exports.sendForgotPasswordLink = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  const secret = process.env.JWT_SECRET_KEY + user.password;
  const token = jwt.sign({ email: user.email, id: user.id }, secret, {
    expiresIn: "10m",
  });
  const link = `http://localhost:4000/password/reset-password/${user.id}/${token}`;
  res.json({ message: "click on the link", restPasswordLink: link });

  //TODO: send email to the user
});

/**
 * @desc Get reset password Link
 * @route /password/reset-password/:user:id/:token
 * @method GET
 * @access Public
 */

module.exports.getresetPasswordview = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  const secret = process.env.JWT_SECRET_KEY + user.password;
  try {
    jwt.verify(req.params.token, secret);
    res.render("reset-password", { email: user.email });
  } catch (error) {
    console.log(error);
    res.json({ message: "Error" });
  }
});

/**
 * @desc  reset  the password
 * @route /password/reset-password/:user:id/:token
 * @method POST
 * @access Public
 */

module.exports.resetThePassword = asyncHandler(async (req, res) => {
  //TODO VALIDATION
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  const secret = process.env.JWT_SECRET_KEY + user.password;
  try {
    jwt.verify(req.params.token, secret);
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    user.password = req.body.password;

    await user.save();
    res.render("success-password");
  } catch (error) {
    console.log(error);
    res.json({ message: "Error" });
  }
});
