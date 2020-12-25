const mongoose = require('mongoose');
const configDB = require('../configDB/configDB');
const utils = require('../../utils/log');

// controller DB connection
const authDB = () => new Promise((resolve, reject) => {
  if (mongoose) {
    // Connection
    return resolve(mongoose.connect(configDB.urlDb, configDB.optionDB));
  }
  // Error
  return reject(utils.terminal.error('DB Connection error.'));
})
  .catch((err) => {
    // Catch Error
    utils.terminal.error(`Error DataBase :\n${err.stack}`);
    return err.stack;
  });

// IF is connected or not
const isConnected = () => new Promise((resolve, reject) => {
  const db = mongoose.connection;

  if (db) {
    return resolve(db.once('open', () => {
      utils.terminal.log('Connection successful on :', configDB.urlDb);
      return true;
    }));
  }
  return reject(db.on('error',
    utils.terminal.error.bind(
      utils.terminal, 'DB Connection error -> Connection Failed.',
    ),
    () => false));
}).catch((err) => {
  utils.terminal.error(`Error DataBase connection :\n${err.stack}`);
  return err.stack;
});

// disconnect
const unAuthDB = () => new Promise((resolve, reject) => {
  const db = mongoose.connection;

  if (db) {
    // Deconnection
    db.on('disconnected', () => {});
    return resolve(mongoose.connect(configDB.urlDb,
      configDB.optionDB,
      db.close(() => {
        utils.terminal.log('\nMongoose default connection is disconnected due to application termination');
        process.exit(0);
      })));
  }
  // Error
  return reject(utils.terminal.error('DB Deconnection error.'));
})
  .catch((err) => {
    // Catch Error
    utils.terminal.error(`Deconnection DataBase Error :\n${err.stack}`);
    return err.stack;
  });
module.exports = {
  authDB,
  isConnected,
  unAuthDB,
};
