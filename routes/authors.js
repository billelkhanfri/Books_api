const express = require("express");
const router = express.Router();
const {
  Author,
  validateCreateAuthor,
  validateUpdateAuthor,
} = require("../models/Authors");
/**
 * @desc Get All authors
 * @route /api/authors
 * @method GET
 * @access Public
 */
router.get("/", async (req, res) => {
  try {
    const authorList = await Author.find().sort({ first_name: 1 });

    res.status(200).json(authorList);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Somthing went wrong" });
  }
});

/**
 * @desc Get author by id
 * @route /api/authors/:id
 * @method Get
 * @access Public
 */

router.get("/:id", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (author) {
      res.status(200).json(author);
    } else {
      res.status(404).json({ message: "Author not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Somthing went wrong" });
  }
});

/**
 * @desc create a new author
 * @route /api/authors/
 * @method POST
 * @access Public
 */
router.post("/", async (req, res) => {
  const { error } = validateCreateAuthor(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const author = new Author({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      nationality: req.body.nationality,
      image: req.body.image,
    });
    const result = await author.save();
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

/**
 * @desc update author
 * @route /api/authors/:id
 * @method Put
 * @access Public
 */
router.put("/:id", async (req, res) => {
  const { error } = validateUpdateAuthor(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const author = await Author.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          nationality: req.body.nationality,
          image: req.body.image,
        },
      },
      { new: true }
    );

    res.status(200).json(author);
    if (book) {
      res.status(200).json({ message: "author has been updated" });
    } else {
      res.status(404).json({ message: "author not found" });
    }
  } catch (err) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

/**
 * @desc delete author
 * @route /api/authors/:id
 * @method Delete
 * @access Public
 */
router.delete("/:id", async (req, res) => {
  const author = await Author.findById(req.params.id);
  try {
    if (author) {
      await Author.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: " Author has been deleted" });
    } else {
      res.status(404).json({ message: "Author not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
