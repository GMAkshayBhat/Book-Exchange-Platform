// addBooks.js
require('dotenv').config();  // This loads the environment variables from your .env file

const mongoose = require('mongoose');
const Book = require('./models/bookModel');  // Adjust the path if needed

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    const book1 = new Book({
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      genre: 'Fiction',
      description: 'A novel about the American dream in the 1920s.',
    });
    await book1.save();

    const book2 = new Book({
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      genre: 'Fiction',
      description: 'A novel about racial injustice in the Deep South.',
    });
    await book2.save();

    console.log('Books added');
    mongoose.disconnect();
  })
  .catch(err => console.error('Error adding books:', err));
