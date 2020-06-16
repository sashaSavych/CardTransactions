const { MongoClient } = require('mongodb');
const { dbUrl } = require('./config');

const getMongoClient = () => {
    return new MongoClient(dbUrl, { useUnifiedTopology: true });
};

const composeResponseMessage = (message) => {
    return { message };
};

module.exports = { getMongoClient, composeResponseMessage };
