const { Book } = require("../models/books");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const booklist = await Book.find();

  if (!booklist) {
    res.status(500).json({ success: false });
  }
  res.send(booklist);
});

router.get("/:id", async (req, res) => {
  const booklist = await Book.findById(req.params.id);

  if (!booklist) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(booklist);
});

router.delete("/:id", (req, res) => {
  Book.findByIdAndRemove(req.params.id)
    .then((book) => {
      if (book) {
        return res
          .status(200)
          .json({ success: true, message: "the booklist is deleted" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "the book not found" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
});

module.exports = router;
