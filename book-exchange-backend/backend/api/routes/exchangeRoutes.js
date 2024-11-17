/**
 * @file exchangeRoutes.js
 * @description Description of the file
 * @author G M Akshay Bhat
 * @created 17 19:17
 * @modified 17 19:17
 */


const express = require('express');
const { createExchangeRequest, getExchangeRequests, getExchangeRequestById, updateExchangeRequest } = require('../../controllers/exchangeController');
const router = express.Router();

// Exchange request routes
router.post('/', createExchangeRequest);  // Create a new exchange request
router.get('/', getExchangeRequests);  // Get all exchange requests
router.get('/:id', getExchangeRequestById);  // Get an exchange request by ID
router.put('/:id', updateExchangeRequest);  // Update exchange request by ID

module.exports = router;
