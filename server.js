import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import bookRoutes from "./routes/books.js";
import userRoutes from "./routes/users.js";   // ✅ User Auth Routes
import adminRoutes from "./routes/admin.js";  // ✅ Admin Panel Routes

// ========================
// 🌍 ENV + DATABASE SETUP
// ========================
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// ========================
// 📚 API ROUTES
// ========================
app.use("/api/books", bookRoutes);   // Book-related routes
app.use("/api/users", userRoutes);   // User login/register/OTP routes
app.use("/api/admin", adminRoutes);  // Admin routes

// ========================
// 🏠 DEFAULT ROUTE
// ========================
app.get("/", (req, res) => {
  res.send("📚 Online Bookstore Backend Running Successfully!");
});

// ========================
// 🚀 SERVER START
// ========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
