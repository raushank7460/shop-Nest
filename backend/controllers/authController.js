const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// ─── Helper: Send Email ───────────────────────────────────────────────────────
const sendEmail = async (to, subject, message) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"ShopNest" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text: message,
  });
};

// ─── Helper: Generate JWT ─────────────────────────────────────────────────────
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// ─── Register User ────────────────────────────────────────────────────────────
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    // Agar user exist karta hai aur verified bhi hai
    if (existingUser && existingUser.isVerified) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Agar user exist karta hai but verified nahi — OTP resend karo
    if (existingUser && !existingUser.isVerified) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otpExpiry = Date.now() + 10 * 60 * 1000;

      existingUser.otp = otp;
      existingUser.otpExpiry = otpExpiry;
      await existingUser.save();

      const message = `Your OTP for ShopNest registration is: ${otp}\nThis OTP is valid for 10 minutes.`;
      await sendEmail(email, "ShopNest - Email Verification OTP", message);

      return res.status(200).json({
        message: "OTP resent to your email. Please verify.",
        email: existingUser.email,
      });
    }

    // New user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = Date.now() + 10 * 60 * 1000;

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpiry,
      isVerified: false,
    });

    const message = `Your OTP for ShopNest registration is: ${otp}\nThis OTP is valid for 10 minutes.`;
    await sendEmail(email, "ShopNest - Email Verification OTP", message);

    res.status(201).json({
      message: "Registered successfully. Please verify your email with the OTP sent.",
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── Verify OTP ───────────────────────────────────────────────────────────────
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body; // ✅ userId ki jagah email use kar rahe hain

  try {
    const user = await User.findOne({ email }); // ✅ email se dhundho

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "User already verified" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (Date.now() > user.otpExpiry) {
      return res
        .status(400)
        .json({
          message: "OTP expired. Please register again to get a new OTP.",
        });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.status(200).json({
      message: "Email verified successfully. You can now login.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── Login User ───────────────────────────────────────────────────────────────
// const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     if (!user.isVerified) {
//       return res
//         .status(401)
//         .json({ message: "Please verify your email before logging in" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     const token = generateToken(user._id);

//     res.status(200).json({
//       message: "Login successful",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.isVerified) {
      return res
        .status(401)
        .json({ message: "Please verify your email before logging in" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,   // ← yeh line add karo
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, verifyOtp, loginUser };