const { MongoClient } = require("mongodb");

let client;
let db;

async function connectDb(url, dbName) {
  client = await MongoClient.connect(url, { useUnifiedTopology: true });
  db = client.db(dbName);
}

function disconnectDb() {
  client.close();
}

function collection(name) {
  return db.collection(name);
}

exports.connectDb = connectDb;
exports.disconnectDb = disconnectDb;
exports.collection = collection;
