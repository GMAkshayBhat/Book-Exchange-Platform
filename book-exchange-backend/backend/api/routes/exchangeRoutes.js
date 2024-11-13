// routes/exchangeRoutes.js
const express = require('express');
const { createExchangeRequest, getExchangeRequests, getExchangeRequestById, updateExchangeRequest } = require('../../controllers/exchangeController');
const router = express.Router();

// Exchange request routes
router.post('/', createExchangeRequest);  // Create a new exchange request
router.get('/', getExchangeRequests);  // Get all exchange requests
router.get('/:id', getExchangeRequestById);  // Get an exchange request by ID
router.put('/:id', updateExchangeRequest);  // Update exchange request by ID

module.exports = router;
