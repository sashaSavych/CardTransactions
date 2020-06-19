const express = require('express');
const expressMongoDb = require('express-mongo-db');
const transactionsRoutes = require('./routes/transactions');
const { dbUrl, dbName } = require('./config');

const app = express();
app.use(expressMongoDb(`${dbUrl}/${dbName}`));

app.use('/api/transactions', transactionsRoutes);

async function start() {
    try {
        const port = process.env.PORT || 3000;
        app.listen(port, () => console.log(`Server has been started on port ${port}.`));
    } catch (e) {
        console.error(e);
    }
}

start();
