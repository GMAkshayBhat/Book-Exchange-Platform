/**
 * @file authRoutes.js
 * @description Description of the file
 * @author G M Akshay Bhat
 * @created 04 19:16
 * @modified 15 19:16
 */


const express = require('express');
const authMiddleware = require('../../middlewares/authMiddleware');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/userModel');  // Import your Mongoose User model
const router = express.Router();
const { registerUser,loginUser, resetPasswordRequest, resetPassword, updateUserProfile, upload } = require('../../controllers/authController');

// Password Reset Request Route (to send reset link)
router.post('/forgot-password', resetPasswordRequest);

// Password Reset Route (to set new password using reset token)
router.post('/reset-password/:token', resetPassword);

// Profile Update Route (for name and profile picture)
router.put('/profile', authMiddleware, upload.single('profilePic'), updateUserProfile);

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,  // Save the hashed password
    });

    // Save the new user to the database
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route - generates and returns JWT token
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare password with hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Manual comparison result:', isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Sign the JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username },  // Payload (data inside the token)
      process.env.JWT_SECRET,  // Secret key for signing the token
      { expiresIn: '1h' }  // Set expiration time (1 hour in this case)
    );

    // Send the token to the client
    res.json({ token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
