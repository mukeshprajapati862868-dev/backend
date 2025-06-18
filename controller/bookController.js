const Book = require("../models/bookModel");

// @desc   Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
};

// @desc   Get a single book by ID (with reviews)
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch book" });
  }
};

// @desc   Add a new book
exports.createBook = async (req, res) => {
  const { name, image, price, genre, rating } = req.body;

  if (!name || !image || !price || !genre || !rating) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newBook = await Book.create({ name, image, price, genre, rating });
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ error: "Failed to create book" });
  }
};

// @desc   Update book
exports.updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedBook)
      return res.status(404).json({ error: "Book not found" });

    res.json(updatedBook);
  } catch (err) {
    res.status(500).json({ error: "Failed to update book" });
  }
};

// @desc   Delete book
exports.deleteBook = async (req, res) => {
  try {
    const deleted = await Book.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ error: "Book not found" });

    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete book" });
  }
};
