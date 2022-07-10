const { Book } = require("../models/books");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  let book = new Book({
    title: req.body.title,
    author: req.body.author,
    image: req.body.image,
    about: req.body.about,
  });
  book = await book.save();

  if (!book) return res.status(400).send("The book details cannot be created");

  res.send(book);
});

module.exports = router;
