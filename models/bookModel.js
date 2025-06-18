// models/Book.js
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    genre: { type: String, required: true },
    rating: { type: Number, required: true },
    reviews: [
      {
        reviewer: String,
        comment: String,
        rating: Number,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
