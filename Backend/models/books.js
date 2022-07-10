const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  title: String,
  author: String,
  image: String,
  about: String,
});

exports.Book = mongoose.model("Book", bookSchema);
