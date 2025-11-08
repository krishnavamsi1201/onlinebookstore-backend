import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";   // ✅ for sending OTP via Gmail
import otpGenerator from "otp-generator"; // ✅ for generating OTP
import User from "../models/User.js";
import Otp from "../models/Otp.js"; // ✅ OTP model

const router = express.Router();

// ===================================================
// ✅ TEST ROUTE (for checking route is working)
// ===================================================
router.get("/test", (req, res) => {
  res.send("✅ Users route working fine!");
});

// ===================================================
// 📩 SEND OTP to Email
// ===================================================
router.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required!" });

    // Generate 6-digit OTP
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
    });

    // Save OTP to DB (auto-expires in 5 mins)
    await Otp.create({ email, otp });

    // Email setup using Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "📧 Your OTP for Online Book Store",
      text: `Hello! 👋\nYour OTP is ${otp}. It will expire in 5 minutes.\n\nOnline Book Store`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "✅ OTP sent successfully to your email!" });
  } catch (err) {
    console.error("❌ Error sending OTP:", err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

// ===================================================
// ✅ VERIFY OTP
// ===================================================
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    const validOtp = await Otp.findOne({ email, otp });

    if (!validOtp) {
      return res.status(400).json({ message: "Invalid or expired OTP!" });
    }

    // OTP verified → delete previous OTPs
    await Otp.deleteMany({ email });

    res.json({ message: "✅ OTP verified successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ===================================================
// 📝 REGISTER USER
// ===================================================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists!" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.json({ message: "🎉 Registration successful!" });
  } catch (err) {
    console.error("❌ Registration Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ===================================================
// 🔐 LOGIN USER (Password-based)
// ===================================================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials!" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "🎉 Login successful!", token });
  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
