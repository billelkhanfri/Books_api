const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const logger = require("./middlewares/logger");
const { notFound, errorHandler } = require("./middlewares/errors");
const cors = require("cors");

// Use the CORS middleware

// Rest of your server code...

dotenv.config();

// connection to Database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("connected to MongoDB"))
  .catch((err) => console.log("connection Failed to Mongodb", err));

//Init App
const app = express();
app.use(logger);
app.use(cors());


const booksPath = require("./routes/books");
const authorPath = require("./routes/authors");
const authPath = require("./routes/auth");

//Apply middlewares
app.use(express.json());

//Routes
app.use("/api/books", booksPath);
app.use("/api/authors", authorPath);
app.use("/api/auth", authPath);
// error andler middleware

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
