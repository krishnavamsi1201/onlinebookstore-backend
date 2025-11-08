import express from "express";
import Book from "../models/Book.js";

const router = express.Router();

// ===============================
// 📚 GET ALL BOOKS
// ===============================
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.error("❌ Error fetching books:", error);
    res.status(500).json({ message: "Server error fetching books" });
  }
});

// ===============================
// ➕ ADD A NEW BOOK
// ===============================
router.post("/", async (req, res) => {
  try {
    const { name, price, image } = req.body;

    // Validation
    if (!name || !price || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const book = new Book({ name, price, image });
    await book.save();
    res.json({ message: "✅ Book added successfully!" });
  } catch (error) {
    console.error("❌ Error adding book:", error);
    res.status(500).json({ message: "Server error adding book" });
  }
});

// ===============================
// ❌ DELETE BOOK BY ID
// ===============================
router.delete("/:id", async (req, res) => {
  try {
    const bookId = req.params.id;
    const deleted = await Book.findByIdAndDelete(bookId);

    if (!deleted) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "✅ Book deleted successfully!" });
  } catch (error) {
    console.error("❌ Error deleting book:", error);
    res.status(500).json({ message: "Server error deleting book" });
  }
});

export default router;

