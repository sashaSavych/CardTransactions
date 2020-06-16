const express = require('express');
const transactionsRoutes = require('./routes/transactions');
const { getMongoClient } = require('./utils');

const app = express();
const mongoClient = getMongoClient();

app.use('/api/transactions', transactionsRoutes);

async function start() {
    try {
        await mongoClient.connect();

        const port = process.env.PORT || 3000;
        app.listen(port, () => console.log(`Server has been started on port ${port}.`));
    } catch (e) {
        console.error(e);
    }
}

start();
