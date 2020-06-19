const csvParser = require('csv-parser');
const { ObjectId } = require('mongodb');
const fs = require('fs');
const path = require('path');

const { collectionName } = require('../config');
const { composeResponseMessage } = require('../utils');
const filePath = path.resolve(__dirname, '../transactions.csv');

const getAll = async (req, res) => {
    try {
        const transactions = req.db.collection(collectionName).find();

        res.status(200).json(await transactions.toArray());
    } catch (e) {
        console.error(e);
        res.status(500).json(composeResponseMessage('Error during retrieving of transactions'));
    }
};

const save = async (req, res) => {
    try {
        const transactions = [];

        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on('data', (data) => transactions.push(data))
            .on('end', async () => {
                await req.db.collection(collectionName).insertMany(transactions);

                res.status(200).json(composeResponseMessage('All transactions have been successfully saved'));
            });
    } catch (e) {
        console.error(e);
        res.status(500).json(composeResponseMessage('Error during saving of transactions'));
    } finally {
        fs.unlink(filePath, () => {});
    }
};

const removeById = async (req, res) => {
    try {
        const { id } = req.params;
        await req.db.collection(collectionName).deleteOne({ _id: ObjectId(id) });

        res.status(200).json(composeResponseMessage('The transaction has been successfully removed'));
    } catch (e) {
        console.error(e);
        res.status(500).json(composeResponseMessage('Error during deleting of transaction'));
    }
};

module.exports = { getAll, save, removeById };
