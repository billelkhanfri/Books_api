const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { User, validateUpdaterUser } = require("../models/User");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");

/**
 * @desc Update User
 * @route /api/users/:id
 * @method PUT
 * @access private
 */
router.put(
  "/:id",
  verifyTokenAndAuthorization,
  asyncHandler(async (req, res) => {
    const { error } = validateUpdaterUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const updtatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          email: req.body.email,
          password: req.body.password,
          username: req.body.username,
        },
      },
      { new: true }
    ).select("-password");
    res.status(200).json(updtatedUser);
  })
);
/**
 * @desc Get All Users
 * @route /api/users/
 * @method GET
 * @access private (only admin)
 */
router.get(
  "/",
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const users = await User.find().select("-password");

    res.status(200).json(users);
  })
);

/**
 * @desc Get User by id
 * @route /api/users/:Id
 * @method GET
 * @access private (only admin & user himself)
 */
router.get(
  "/:id",
  verifyTokenAndAuthorization,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "user not found" });
    }
  })
);

/**
 * @desc Delete User
 * @route /api/users/:Id
 * @method DELETE
 * @access private (only admin & user himself)
 */
router.delete(
  "/:id",
  verifyTokenAndAuthorization,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");

    if (user) {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "user has been deleted" });
    } else {
      res.status(404).json({ message: "user not found" });
    }
  })
);
module.exports = router;
