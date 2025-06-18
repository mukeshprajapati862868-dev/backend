const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require("../controller/bookController");

// ✅ Import Book model for custom routes
const Book = require("../models/bookModel");

// 📚 Main Book CRUD Routes
router.get("/", getAllBooks);            // GET /api/books
router.get("/:id", getBookById);         // GET /api/books/:id
router.post("/", createBook);            // POST /api/books
router.put("/:id", updateBook);          // PUT /api/books/:id
router.delete("/:id", deleteBook);       // DELETE /api/books/:id

// 🌟 Add Review to a Book
router.post("/:id/reviews", async (req, res) => {
  const { id } = req.params;
  const { reviewer, comment, rating } = req.body;

  try {
    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    book.reviews.push({ reviewer, comment, rating });
    await book.save();

    res.status(200).json({ message: "Review added", book });
  } catch (err) {
    console.error("Review error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
