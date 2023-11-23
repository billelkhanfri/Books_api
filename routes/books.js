const express = require("express");
const router = express.Router();

const asyncHandler = require("express-async-handler");

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
    const bookList = await Book.find().populate("author", [
      "first_name",
      "last_name",
    ]);
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
      "first_name",
      "last_name",
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
 * @access Public
 */
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { error } = validateCreateBook(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      price: req.body.price,
      cover: req.body.cover,
      language: req.body.language,
    });
    const result = await book.save();
    res.status(201).json(result);
  })
);

/**
 * @desc  Update book
 * @route api/books/:id
 * @method Put
 * @access Public
 */

router.put(
  "/:id",
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
          genre: req.body.genre,
          price: req.body.price,
          cover: req.body.cover,
          language: req.body.language,
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
 * @access Public
 */
router.delete(
  "/:id",
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
