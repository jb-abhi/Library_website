const { Book } = require("../models/books");
const express = require("express");
const router = express.Router();

router.put("/:id", async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    author: req.body.author,
    image: req.body.image,
    about: req.body.about,
  });
  if (!book) return res.status(400).send("The book details cannot be created");

  res.send(book);
});

module.exports = router;
