const Transaction = require('../models/TransactionModel');

const createTransaction = async (req, res) => {
    const { userId, type, amount, category, description } = req.body;

    const newTransaction = new Transaction({
        userId,
        type,
        amount,
        category,
        description
    });

    try {
        await newTransaction.save();
        res.status(201).send('Transaction created successfully');
    } catch (error) {
        res.status(400).send('Error creating transaction: ' + error.message);
    }
};

const getTransactions = async (req, res) => {
    const { userId } = req.params;

    try {
        const transactions = await Transaction.find({ userId });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(400).send('Error retrieving transactions: ' + error.message);
    }
};

module.exports = { createTransaction, getTransactions };
