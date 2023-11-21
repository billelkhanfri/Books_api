const express = require("express");

//Init App
const app = express();

const booksPath = require("./routes/books");

//Apply middlewares
app.use(express.json());

//Routes
app.use("/api/books", booksPath);

const PORT = 4000;
app.listen(PORT, () => console.log(" server is running on port 4000"));