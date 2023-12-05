const express = require("express");
const logger = require("./middlewares/logger");
const { notFound, errorHandler } = require("./middlewares/errors");
const connectToDB = require("./config/db");
require("dotenv").config();
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");

// connection to Database
connectToDB();

//Init App
const app = express();

//Static Folder
app.use(express.static(path.join(__dirname, "images")));
//Apply middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger);

// setView engin
app.set("view engine", "ejs");

// Helmet
app.use(helmet());
// Cors Policy
app.use(cors());
//Routes
app.use("/api/books", require("./routes/books"));
app.use("/api/authors", require("./routes/authors"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/password", require("./routes/password"));
app.use("/api/upload", require("./routes/upload"));

// error handler middleware

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
