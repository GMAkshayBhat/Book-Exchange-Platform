/**
 * @file bookRoutes.js
 * @description Description of the file
 * @author G M Akshay Bhat
 * @created 08 19:17
 * @modified 11 19:17
 */


const express = require('express');
const { createBook, getBooks, getBookById, updateBook, deleteBook,toggleFavorite } = require('../../controllers/bookController');
const router = express.Router();
const bookController = require('../../controllers/bookController');
const authenticateJWT = require('../../middlewares/authMiddleware'); // Ensure the JWT middleware is correctly implemented

router.get('/', async (req, res, next) => {
    if (req.query.mine === 'true') {
      // If the `mine=true` query is present, we want to authenticate the user
      return authenticateJWT(req, res, () => {
        bookController.getBooks(req, res); // Call the controller after authentication
      });
    } else {
      // If `mine` is not specified, just return public books
      return bookController.getBooks(req, res);
    }
  });

// Protected routes (Authentication required)
router.post('/', authenticateJWT, bookController.createBook); // Add a new book
router.put('/:id', authenticateJWT, bookController.updateBook); // Update a book
router.delete('/:id', authenticateJWT, bookController.deleteBook); // Delete a book
router.patch('/:id/favorite', authenticateJWT, bookController.toggleFavorite); // Toggle favorite
module.exports = router;
