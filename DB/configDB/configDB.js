// SETTING VAR ENV
const usernameDB = process.env.USERNAME_DB;
const passwordDb = process.env.PASSWORD_DB;
const hostlistDb = process.env.HOSTLIST_DB;
const databaseDb = process.env.DATABASE_DB;
const authSourceDb = process.env.AUTHSOURCE_DB;

// Var / OBJ
const urlDb = `mongodb+srv://${usernameDB}:${passwordDb}@${hostlistDb}.mongodb.net/${databaseDb}?authSource=${authSourceDb}`;
const optionDB = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

// EXPORT AND CREATION OF THE DB URL
module.exports = {
  urlDb,
  optionDB,
};
//
// if (process.env.NODE_ENV === 'production')
//         module.exports = {
//         urlDb: 'mongodb+srv://admin:admin@cluster0-rjtu9.mongodb.net/HealthSafe?authSource=admin'
//         }
