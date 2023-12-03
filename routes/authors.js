const express = require("express");
const router = express.Router();
const {
  allAuthors,
  authorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} = require("../controllers/authorController");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");

router.get("/", allAuthors);

router.get("/:id", authorById);

router.post("/", verifyTokenAndAdmin, createAuthor);

router.put("/:id", verifyTokenAndAdmin, updateAuthor);


router.delete("/:id", verifyTokenAndAdmin, deleteAuthor);

module.exports = router;
