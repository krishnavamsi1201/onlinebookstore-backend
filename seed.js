// backend/seed.js
import dotenv from "dotenv";
import mongoose from "mongoose";
import Book from "./models/Book.js";

dotenv.config();

const MONGO = process.env.MONGO_URI;

const sampleBooks = [
  { name: "A Good Girl's Guide to Murder", price: 390, image: "images/a good girl.jpg" },
  { name: "The Adventures of Tom Sawyer",    price: 300, image: "images/adventures of tom sawyer.jpg" },
  { name: "I Don't Love You Anymore",        price: 350, image: "images/i dont love you anymore.jpg" },
  { name: "Rise Above",                      price: 450, image: "images/riseabove.jpg" },
  { name: "The Secret Book",                 price: 420, image: "images/secrete.jpg" },
  { name: "Fang Fiction",                    price: 550, image: "images/images (3).jpg" },
  { name: "Boy Swallows Universe",           price: 600, image: "images/images (9).jpg" }
];

async function run() {
  try {
    await mongoose.connect(MONGO);
    console.log("✅ Connected. Clearing old books…");
    await Book.deleteMany({});
    const out = await Book.insertMany(sampleBooks);
    console.log(`📚 Inserted ${out.length} books.`);
  } catch (e) {
    console.error("❌ Seed failed:", e.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected.");
    process.exit(0);
  }
}

run();

