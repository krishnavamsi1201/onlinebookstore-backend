import mongoose from "mongoose";

// =============================
// 🧑‍💼 Admin Schema
// =============================
const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
});

// Create the model (collection: "admins")
const Admin = mongoose.model("Admin", adminSchema);

export default Admin;

