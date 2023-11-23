const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const logger = require("./middlewares/logger");
const { notFound, errorHandler } = require("./middlewares/errors");

dotenv.config();

// connection to Database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("connected to MongoDB"))
  .catch((err) => console.log("connection Failed to Mongodb", err));

//Init App
const app = express();
app.use(logger);

const booksPath = require("./routes/books");
const authorPath = require("./routes/authors");

//Apply middlewares
app.use(express.json());

//Routes
app.use("/api/books", booksPath);
app.use("/api/authors", authorPath);

// error andler middleware

app.use(notFound);
app.use(errorHandler);

const PORT = 4000;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
