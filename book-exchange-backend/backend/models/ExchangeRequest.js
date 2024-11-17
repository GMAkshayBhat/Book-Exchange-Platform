/**
 * @file ExchangeRequest.js
 * @description Description of the file
 * @author G M Akshay Bhat
 * @created 03 19:20
 * @modified 03 19:20
 */


const mongoose = require('mongoose');

const exchangeRequestSchema = new mongoose.Schema({
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
    requestor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['Pending', 'Accepted', 'Rejected'], default: 'Pending' },
    terms: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ExchangeRequest', exchangeRequestSchema);
