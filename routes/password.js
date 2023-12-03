const express = require("express");
const {
  getForgotPasswordView,
  sendForgotPasswordLink,
  getresetPasswordview,
  resetThePassword,
} = require("../controllers/passwordController");
const router = express.Router();
// /password/forgot-password
router
  .route("/forgot-password")
  .get(getForgotPasswordView)
  .post(sendForgotPasswordLink);

// /password/reset-password
router
  .route("/reset-password/:userId/:token")
  .get(getresetPasswordview)
  .post(resetThePassword);

module.exports = router;
