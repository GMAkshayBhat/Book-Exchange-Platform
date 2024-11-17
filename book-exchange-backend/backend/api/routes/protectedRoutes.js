/**
 * @file protectedRoutes.js
 * @description Description of the file
 * @author G M Akshay Bhat
 * @created 09 19:17
 * @modified 17 19:17
 */


const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const authMiddleware = require('../../middlewares/authMiddleware');  // Import the auth middleware
const User = require('../../models/userModel'); // Assuming you're using a User model
const router = express.Router();

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/profile-pics';

    // Check if directory exists, if not create it
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir); // Set the destination for the uploaded file
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate a unique filename using timestamp
  }
});

// Initialize multer with storage configuration
const upload = multer({ storage: storage });

// Protected route to get the profile data
router.get('/profile', authMiddleware, (req, res) => {
  
  res.json({ message: 'This is a protected route', user: req.user });
});

// Route to update profile (including username and profile picture)
router.put('/profile', authMiddleware, upload.single('profilePic'), async (req, res) => {
  try {
    const { username } = req.body;
    const profilePic = req.file ? req.file.filename : null; // Get the uploaded file's filename

    const user = req.user;  // The user is available directly from the auth middleware

    if (username) user.username = username; // Update username if provided
    if (profilePic) user.profilePic = profilePic; // Update profile picture if provided

    await user.save(); // Save the updated user data

    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: 'Failed to update profile', error: error.message });
  }
});

module.exports = router;
