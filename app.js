const express = require("express");
const mongoose =  require("mongoose")

// connection to Database
mongoose
.connect("mongodb://localhost/bookStoreDB")
.then(()=> console.log("connected to MongoDB"))
.catch((err) => console.log("connection Failed to Mongodb", err))

//Init App
const app = express();

const booksPath = require("./routes/books");
const authorPath = require("./routes/authors");

//Apply middlewares
app.use(express.json());

//Routes
app.use("/api/books", booksPath);
app.use("/api/authors", authorPath);

const PORT = 4000;
app.listen(PORT, () => console.log(" server is running on port 4000"));
