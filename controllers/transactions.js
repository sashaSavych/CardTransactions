const csvParser = require('csv-parser');
const { ObjectId } = require('mongodb');
const fs = require('fs');
const path = require('path');

const { dbName, collectionName } = require('../config');
const { composeResponseMessage, getMongoClient } = require('../utils');

const getAll = async (req, res) => {
    const client = getMongoClient();

    try {
        await client.connect();
        const db = client.db(dbName);
        const transactions = db.collection(collectionName).find();

        res.status(200).json(await transactions.toArray());
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
};

const save = async (req, res) => {
    const client = getMongoClient();

    try {
        const transactions = [];

        fs.createReadStream(path.resolve(__dirname, '../data.csv'))
            .pipe(csvParser())
            .on('data', (data) => transactions.push(data))
            .on('end', async () => {
                await client.connect();
                const db = client.db(dbName);
                await db.collection(collectionName).insertMany(transactions);

                res.status(200).json(composeResponseMessage('All transactions have been successfully saved'));
            });
    } catch (e) {
        console.error(e);
        res.status(500).json(composeResponseMessage('Error during saving of transactions'));
    } finally {
        await client.close();
    }
};

const removeById = async (req, res) => {
    const client = getMongoClient();

    try {
        const { id } = req.params;
        await client.connect();
        const db = client.db(dbName);
        await db.collection(collectionName).deleteOne({ _id: ObjectId(id) });

        res.status(200).json(composeResponseMessage('The transaction has been successfully removed'));
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
};

module.exports = { getAll, save, removeById };
