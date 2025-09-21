const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

exports.registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ fullName, email, password });

    res.status(201).json({
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Simple test login - accept any credentials
    console.log(`🧪 TEST LOGIN: Attempting login for email: ${email}`);

    // Check if user exists
    let user = await User.findOne({ email });

    // If user doesn't exist, create a test user
    if (!user) {
      console.log(`🧪 TEST LOGIN: Creating new test user for email: ${email}`);
      user = await User.create({
        fullName: email.split('@')[0] || 'Test User', // Use part before @ as name
        email: email,
        password: 'testpassword123' // Set a default test password
      });
    }

    // Generate and return token (same as before)
    res.status(200).json({
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error(`🧪 TEST LOGIN ERROR: ${err.message}`);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
