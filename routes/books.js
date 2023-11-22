const express = require("express");
const router = express.Router();
const Joi = require("joi");

const data = require("../data.json");

/**
 * @desc  Get all books
 * @route api/books
 * @method Get
 * @access Public
 */

router.get("/", (req, res) => {
  res.status(200).json(data);
});

/**
 * @desc  Get book by id
 * @route api/books/:id
 * @method Get
 * @access Public
 */
router.get("/:id", (req, res) => {
  const book = data.find((item) => item.id === parseInt(req.params.id));
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: "book not found" });
  }
});

/**
 * @desc  Post new book
 * @route api/books/
 * @method Post
 * @access Public
 */
router.post("/", (req, res) => {
  const { error } = validateCreateBook(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const newBook = {
    id: data.length + 1,
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    price: req.body.price,
    publisher: req.body.publisher,
    language: req.body.language,
  };
  data.push(newBook);
  res.status(201).json(newBook);
});

/**
 * @desc  Update book
 * @route api/books/:id
 * @method Put
 * @access Public
 */

router.put("/:id", (req, res) => {
  const { error } = validateUpdateBook(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const updateBook = data.find((item) => item.id === parseInt(req.params.id));
  if (updateBook) {
    res.status(200).json({ message: "book has been updated" });
  } else {
    res.status(404).json({ message: "book not found" });
  }
});

/**
 * @desc  Delete book
 * @route api/books/:id
 * @method Delete
 * @access Public
 */
router.delete("/:id", (req, res) => {
  const deletedBook = data.find((item) => item.id === parseInt(req.params.id));
  if (deletedBook) {
    res.status(200).json({ message: "book has been deleted" });
  } else {
    res.status(404).json({ message: "book not found" });
  }
});

function validateCreateBook(obj) {
  const schema = Joi.object({
    title: Joi.string().trim().min(1).max(200).required(),
    author: Joi.string().trim().min(1).max(200).required(),
    genre: Joi.string().trim().min(1).max(200).required(),
    price: Joi.number().min(0).required(),
    publisher: Joi.string().required(),
    language: Joi.string().min(3).required(),
  });
  return schema.validate(obj);
}

function validateUpdateBook(obj) {
  const schema = Joi.object({
    title: Joi.string().trim().min(1).max(200),
    author: Joi.string().trim().min(1).max(200),
    genre: Joi.string().trim().min(1).max(200),
    price: Joi.number().min(0),
    publisher: Joi.string(),
    language: Joi.string().min(3),
  });
  return schema.validate(obj);
}
module.exports = router;
