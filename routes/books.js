const express = require("express");
const router = express.Router();

const asyncHandler = require("express-async-handler");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");

const {
  Book,
  validateCreateBook,
  validateUpdateBook,
} = require("../models/Books");

/**
 * @desc  Get all books
 * @route api/books
 * @method Get
 * @access Public
 */

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const { minPrice, maxPrice } = req.query;
    let bookList;

    if (minPrice && maxPrice) {
      bookList = await Book.find({
        price: { $gte: minPrice, $lte: maxPrice },
      }).populate("author", ["firstName", "lastName"]);
    }
    else {
      bookList = await Book.find().populate("author", ["firstName", "lastName"]);

    }

    res.status(200).json(bookList);
  })
);

/**
 * @desc  Get book by id
 * @route api/books/:id
 * @method Get
 * @access Public
 */
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id).populate("author", [
      "firstName",
      "lastName",
    ]);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: "book not found" });
    }
  })
);

/**
 * @desc  Post new book
 * @route api/books/
 * @method Post
 * @access Private
 */
router.post(
  "/",
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const { error } = validateCreateBook(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      price: req.body.price,
      cover: req.body.cover,
    });
    const result = await book.save();
    res.status(201).json(result);
  })
);

/**
 * @desc  Update book
 * @route api/books/:id
 * @method Put
 * @access Private (only admin)
 */

router.put(
  "/:id",
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const { error } = validateUpdateBook(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
          author: req.body.author,
          description: req.body.description,
          price: req.body.price,
          cover: req.body.cover,
        },
      },
      { new: true }
    );

    if (book) {
      res.status(200).json({ message: "book has been updated" });
    } else {
      res.status(404).json({ message: "book not found" });
    }
  })
);

/**
 * @desc  Delete book
 * @route api/books/:id
 * @method Delete
 * @access Private
 */
router.delete(
  "/:id",
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (book) {
      await Book.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "book has been deleted" });
    } else {
      res.status(404).json({ message: "book not found" });
    }
  })
);

module.exports = router;
