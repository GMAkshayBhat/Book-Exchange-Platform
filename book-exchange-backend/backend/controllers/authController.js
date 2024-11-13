const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const multer = require('multer');
const { sendPasswordResetEmail } = require('../services/brevoMailService');

// Register User
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Email validation (basic)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

// Password Reset Request
const resetPasswordRequest = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'Email not found' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetToken = resetToken;
    user.resetTokenExpiration = Date.now() + 3600000; // 1 hour
    await user.save();
 // Send the reset email
 await sendPasswordResetEmail(email, resetToken);

 
      console.log('Email sent successfully.');
  
    res.json({ message: 'Password reset link sent' });
  } catch (error) {
    console.error('Error in resetPasswordRequest:', error);
    res.status(500).json({ error: '--- Failed to send reset email' });
  }
};

// Password Reset
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } });
    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired reset token' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reset password' });
  }
};

// Update User Profile (including profile picture)
const updateUserProfile = async (req, res) => {
  const { name } = req.body;
  const profilePic = req.file ? req.file.path : undefined;  // Store the file path

  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,  // Assuming user is authenticated and req.user is populated with user data
      { name, profilePic },
      { new: true }
    );
    res.status(200).json({ message: 'Profile updated', user });
  } catch (error) {
    res.status(500).json({ error: 'Error updating profile' });
  }
};

// Set up multer for handling profile picture uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/profiles');  // Store uploaded files in 'uploads/profiles' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = { registerUser, loginUser, resetPasswordRequest, resetPassword, updateUserProfile, upload };
