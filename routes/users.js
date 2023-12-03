const express = require("express");
const router = express.Router();
const {
  updateUser,
  allUsers,
  userById,
  deleteUser,
} = require("../controllers/userController");

const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");

router.put("/:id", verifyTokenAndAuthorization, updateUser);

router.get("/", verifyTokenAndAdmin, allUsers);

router.get("/:id", verifyTokenAndAuthorization, userById);

router.delete("/:id", verifyTokenAndAuthorization, deleteUser);
module.exports = router;
