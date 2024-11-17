/**
 * @file bookController.js
 * @description Description of the file
 * @author G M Akshay Bhat
 * @created 07 19:19
 * @modified 13 19:19
 */


const Book = require('../models/bookModel');  // Ensure Book model is correctly imported

// Create a new book
exports.createBook = async (req, res) => {
  try {
    const { title, author, genre, condition, availability } = req.body;
    const owner = req.user.id;  // Assuming user is authenticated

    const book = new Book({
      title,
      author,
      genre,
      condition,
      availability,
      owner,
      pdfFileUrl: req.file ? req.file.path : null  // Assuming file upload
    });

    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: 'Error creating book' });
  }
};

// Get books
exports.getBooks = async (req, res) => {
  try {
    let books;
    console.log('req.user:', req.user);  // Log req.user to check if it's populated
    if (req.query.mine === 'true') {
     
      // Fetch only the books of the authenticated user
      if (!req.user || !req.user.id) {
       
        
        return res.status(401).json({ error: 'Authentication required' });
      }
      books = await Book.find({ owner: req.user.id });
    } else {
      // Fetch all books (public access)
      books = await Book.find();
    }

    if (!books || books.length === 0) {
      return res.status(200).json({ data: [], message: 'Your book list is currently empty' });

    }

    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching books' });
  }
};


// Get a book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching book' });
  }
};

// Update a book by ID
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ error: 'Error updating book' });
  }
};

// Delete a book by ID
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error deleting book' });
  }
};

// Toggle the favorite status of a book
exports.toggleFavorite = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).send('Book not found');
    }

    // Toggle the favorite status
    book.favorite = !book.favorite;
    book.updatedAt = Date.now();

    await book.save();
    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};