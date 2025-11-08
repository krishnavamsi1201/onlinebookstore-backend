import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import bookRoutes from "./routes/books.js";
import userRoutes from "./routes/users.js";   // ✅ User Auth Routes
import adminRoutes from "./routes/admin.js";  // ✅ Admin Panel Routes

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// ========================
// 📚 API ROUTES
// ========================
app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes); // ✅ Added Admin API Route

// ========================
// 🏠 DEFAULT ROUTE
// ========================
app.get("/", (req, res) => res.send("📚 Online Bookstore Backend Running"));

// ========================
// 🚀 SERVER START
// ========================
app.listen(process.env.PORT || 5000, () =>
  console.log(`🚀 Server running on port ${process.env.PORT}`)
);

