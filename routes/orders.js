import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// Place order
router.post("/", async (req, res) => {
  const { user, items, total, address } = req.body;
  const order = new Order({ user, items, total, address });
  await order.save();
  res.json({ message: "Order placed successfully" });
});

export default router;

