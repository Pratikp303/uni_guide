const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ==============================
// SIGNUP
// ==============================
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 🔴 validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    // 🔴 check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 🔐 hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ==============================
// LOGIN
// ==============================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔴 check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 🔐 compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 🔐 generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,   // ✅ FIXED
      { expiresIn: '1d' }
    );

    res.json({
      message: "Login successful",
      token
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ==============================
// GET USERS
// ==============================
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ==============================
module.exports = {
  signup,
  login,
  getUsers
};