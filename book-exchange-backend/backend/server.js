// server.js
require('dotenv').config();  // Load environment variables
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const exchangeRoutes = require('./routes/exchangeRoutes');
const protectedRoutes = require('./routes/protectedRoutes');  // Import the protected routes

const app = express();
app.use(cors({ origin: 'http://localhost:3000' })); // Allow requests from React dev server
// Middleware to parse JSON request body
app.use(express.json());

// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Extract token from the 'Authorization' header
  
  if (!token) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }

  // Verify the token using the secret key
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token.' });
    }
    req.user = decoded; // Attach user info to request object
    next(); // Proceed to the next middleware/route
  });
};

// Public routes
app.use('/api/auth', authRoutes);

// Protected routes (require JWT)
app.use('/api/books', authenticateJWT, bookRoutes);
app.use('/api/exchanges', authenticateJWT, exchangeRoutes);

// Optional: If you want to add any protected routes:
app.use('/api/protected', authenticateJWT, protectedRoutes); 

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process if MongoDB connection fails
  });

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
