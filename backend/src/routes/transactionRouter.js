const express = require('express');
const { createTransaction, getTransactions } = require('../controllers/transactionController');

const router = express.Router();

router.post('/transactions', createTransaction);
router.get('/transactions/:userId', getTransactions);

module.exports = router;
