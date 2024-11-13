// routes/bookRoutes.js
const express = require('express');
const { createBook, getBooks, getBookById, updateBook, deleteBook } = require('../controllers/bookController');
const router = express.Router();

// Book routes
router.post('/', createBook);  // Create a new book
router.get('/', getBooks);  // Get all books
router.get('/:id', getBookById);  // Get a book by ID
router.put('/:id', updateBook);  // Update a book by ID
router.delete('/:id', deleteBook);  // Delete a book by ID

module.exports = router;
