const express = require("express");
const router = express.Router();
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");

const {
  getAllBooks,
  getBookById,
  createBook,
  UpdateBook,
  deleteBook,
} = require("../controllers/bookController");

router.get("/", getAllBooks);

router.get("/:id", getBookById);

router.post("/", createBook, verifyTokenAndAdmin);

router.put("/:id", verifyTokenAndAdmin, UpdateBook);

router.delete("/:id", verifyTokenAndAdmin, deleteBook);

module.exports = router;
