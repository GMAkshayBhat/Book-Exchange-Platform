// routes/protectedRoutes.js
const express = require('express');
const authMiddleware = require('../../middlewares/authMiddleware');  // Import the auth middleware
const router = express.Router();

// Example of a protected route
router.get('/profile', authMiddleware, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;
