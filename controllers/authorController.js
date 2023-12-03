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

const allAuthors = async (req, res) => {
  try {
    const { pageNumber } = req.query;
    const authorPerPage = 4;

    const authorList = await Author.find()
      .skip((pageNumber - 1) * authorPerPage)
      .limit(authorPerPage);

    res.status(200).json(authorList);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Somthing went wrong" });
  }
};

/**
 * @desc Get author by id
 * @route /api/authors/:id
 * @method Get
 * @access Public
 */

const authorById = async (req, res) => {
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
};

/**
 * @desc create a new author
 * @route /api/authors/
 * @method POST
 * @access Private (only admin)
 */
const createAuthor = async (req, res) => {
  const { error } = validateCreateAuthor(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const author = new Author({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      nationality: req.body.nationality,
      image: req.body.image,
    });
    const result = await author.save();
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

/**
 * @desc update author
 * @route /api/authors/:id
 * @method Put
 * @access Private
 */

const updateAuthor = async (req, res) => {
  const { error } = validateUpdateAuthor(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const author = await Author.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
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
};

/**
 * @desc delete author
 * @route /api/authors/:id
 * @method Delete
 * @access Private
 */

const deleteAuthor = async (req, res) => {
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
};
module.exports = {
  allAuthors,
  authorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
