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

// Get all books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
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
