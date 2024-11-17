/**
 * @file authController.js
 * @description Description of the file
 * @author G M Akshay Bhat
 * @created 10 19:13
 * @modified 10 19:13
 */


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const multer = require('multer');
const { sendPasswordResetEmail } = require('../services/mailSender');

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
    res.status(500).json({ error: ' Failed to send reset email' });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  console.log('Received token:', token); // Log token received in request

  try {
    // Fetch the user based on token and expiration
    const user = await User.findOne({ 
      resetToken: token, 
      resetTokenExpiration: { $gt: Date.now() } 
    });

    console.log('Found user:', user); // Log user found in database

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired reset token' });
    }

    // Hash and update the password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error in resetPassword:', error);
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

module.exports = { resetPasswordRequest, resetPassword, updateUserProfile, upload };
