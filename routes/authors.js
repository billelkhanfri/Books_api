const express = require("express");
const router = express.Router();
const Joi = require("joi");
const authorData = require("../authors.json");

/**
 * @desc Get All authors
 * @route /api/authors
 * @method Get
 * @access Public
 */
router.get("/", (req, res) => {
  res.status(200).json(authorData);
});

/**
 * @desc Get author by id
 * @route /api/authors/:id
 * @method Get
 * @access Public
 */

router.get("/:id", (req, res) => {
  const author = authorData.find((item) => item.id === parseInt(req.params.id));

  if (author) {
    res.status(200).json(author);
  } else {
    res.status(404).json({ message: "Author not found" });
  }
});

/**
 * @desc create a new author
 * @route /api/authors/
 * @method Post
 * @access Public
 */
router.post("/", (req, res) => {
  const { error } = validateCreateAuthor(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const author = {
    id: authorData.length + 1,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    nationality: req.body.nationality,
    image: req.body.image,
  };
  authorData.push(author);
  res.status(201).json(author);
});

/**
 * @desc update author
 * @route /api/authors/:id
 * @method Put
 * @access Public
 */
router.put("/:id", (req, res) => {
  const { error } = validateUpdateAuthor(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const author = authorData.find((item) => item.id === parseInt(req.params.id));
  if (author) {
    res.status(200).json({ message: " Author has been updated" });
  } else {
    res.status(404).json({ message: "Author not found" });
  }
});

/**
 * @desc delete author
 * @route /api/authors/:id
 * @method Delete
 * @access Public
 */
router.delete("/:id", (req, res) => {
  const author = authorData.find((item) => item.id === parseInt(req.params.id));
  if (author) {
    res.status(200).json({ message: " Author has been deleted" });
  } else {
    res.status(404).json({ message: "Author not found" });
  }
});

function validateCreateAuthor(obj) {
  const schema = Joi.object({
    first_name: Joi.string().trim().min(2).max(200).required(),
    last_name: Joi.string().trim().min(2).max(200).required(),
    nationality: Joi.string().trim().min(3).max(200).required(),
    image: Joi.string().trim().min(3).max(500).required(),
  });
  return schema.validate(obj);
}

function validateUpdateAuthor(obj) {
  const schema = Joi.object({
    first_name: Joi.string().trim().min(2).max(200),
    last_name: Joi.string().trim().min(2).max(200),
    nationality: Joi.string().trim().min(3).max(200),
    image: Joi.string().trim().min(3).max(500),
  });
  return schema.validate(obj);
}

module.exports = router;
