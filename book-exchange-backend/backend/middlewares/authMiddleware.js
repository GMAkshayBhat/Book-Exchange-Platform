/**
 * @file authMiddleware.js
 * @description 
 * @author G M Akshay Bhat
 * @created 07 19:19
 * @modified 17 19:19
 */


const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authMiddleware = async (req, res, next) => {
  try {
    // Extract token
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
      console.log('No token provided');
      return res.status(401).json({ message: 'No token provided' });
    }


    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
   

    // Find the user
    const user = await User.findById(decoded.userId);
    if (!user) {
      
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Authenticated user:', user);

    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error.message);
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authMiddleware;

