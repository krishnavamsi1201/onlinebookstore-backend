import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: Array,
  total: Number,
  address: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Order", orderSchema);
