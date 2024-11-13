// models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    condition: String,
    availability: Boolean,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    pdfFileUrl: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Book', bookSchema);
