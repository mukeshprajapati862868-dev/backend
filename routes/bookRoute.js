const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require("../controller/bookController");

// ✅ Corrected: Import from bookModel.js
const Book = require("../models/bookModel");

// Existing routes (do not change)
router.get("/", getAllBooks);           // GET /api/books
router.get("/:id", getBookById);        // GET /api/books/:id
router.post("/", createBook);           // POST /api/books
router.put("/:id", updateBook);         // PUT /api/books/:id
router.delete("/:id", deleteBook);      // DELETE /api/books/:id

// ✅ Add Review Route
router.post("/:id/reviews", async (req, res) => {
  const { id } = req.params;
  const { reviewer, comment, rating } = req.body;

  try {
    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    book.reviews.push({ reviewer, comment, rating });
    await book.save();

    res.status(200).json({ message: "Review added successfully", book });
  } catch (err) {
    console.error("Error adding review:", err);
    res.status(500).json({ message: "Failed to add review" });
  }
});

module.exports = router;
