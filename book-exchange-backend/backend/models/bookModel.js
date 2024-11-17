/**
 * @file bookModel.js
 * @description Description of the file
 * @author G M Akshay Bhat
 * @created 03 19:20
 * @modified 03 19:20
 */


const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    condition: String,
    availability: Boolean,
    favorite: { type: Boolean, default: false }, // Default to false
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' , required: true},
    pdfFileUrl: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Book', bookSchema);
