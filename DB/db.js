const ctrlAuthDB = require('./controllersDB/ctrlAuthDB');

const mongoClient = ctrlAuthDB.authDB(ctrlAuthDB.isConnected());

process.on('SIGINT', ctrlAuthDB.unAuthDB);
process.on('SIGTERM', ctrlAuthDB.unAuthDB);

module.exports = mongoClient;
