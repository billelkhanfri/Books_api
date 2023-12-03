const { Book } = require("./models/Books");
const { Author } = require("./models/Authors");
const { books, authors } = require("./data");
const connectToDB = require("./config/db");
require("dotenv").config();

//connection to db
connectToDB();

// Import Books
const importBooks = async () => {
  try {
    await Book.insertMany(books);
    console.log("books imported");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// Remove Books
const removeBooks = async () => {
  try {
    await Book.deleteMany();
    console.log("books removed");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
if (process.argv[2] === "-import") {
  importBooks();
} else if (process.argv[2] === "-remove") {
  removeBooks();
}
// Import Authore
const importAuthors = async () => {
  try {
    await Author.insertMany(authors);
    console.log("authors imported");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
// Remove Authors
const removeAuthors = async () => {
  try {
    await Authors.deleteMany();
    console.log("authors removed");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
if (process.argv[2] === "-import-authors") {
  importAuthors();
} else if (process.argv[2] === "-remove-authors") {
  removeAuthors();
}
