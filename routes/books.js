const express = require("express");
const router = express.Router();
const Joi = require("joi");

const data = require("../data.json");

// get the whole data

router.get("/", (req, res) => {
  res.status(200).json(data);
});

// get one book
router.get("/:id", (req, res) => {
  const book = data.find((item) => item.id === parseInt(req.params.id));
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: "book not found" });
  }
});
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
module.exports = router;
