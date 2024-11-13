// controllers/exchangeController.js
const ExchangeRequest = require('../models/ExchangeRequest');

exports.createExchangeRequest = async (req, res) => {
    try {
        const { book, terms } = req.body;
        const requestor = req.user.id;

        const exchangeRequest = new ExchangeRequest({
            book,
            requestor,
            terms
        });

        await exchangeRequest.save();
        res.status(201).json(exchangeRequest);
    } catch (error) {
        res.status(400).json({ error: 'Error creating exchange request' });
    }
};

exports.getExchangeRequests = async (req, res) => {
    try {
        const exchangeRequests = await ExchangeRequest.find();
        res.status(200).json(exchangeRequests);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching exchange requests' });
    }
};

exports.getExchangeRequestById = async (req, res) => {
    try {
        const { id } = req.params;
        const exchangeRequest = await ExchangeRequest.findById(id);

        if (!exchangeRequest) {
            return res.status(404).json({ error: 'Exchange request not found' });
        }

        res.status(200).json(exchangeRequest);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching exchange request' });
    }
};

exports.updateExchangeRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, terms } = req.body;

        const updatedExchangeRequest = await ExchangeRequest.findByIdAndUpdate(id, { status, terms }, { new: true });

        if (!updatedExchangeRequest) {
            return res.status(404).json({ error: 'Exchange request not found' });
        }

        res.status(200).json(updatedExchangeRequest);
    } catch (error) {
        res.status(500).json({ error: 'Error updating exchange request' });
    }
};
