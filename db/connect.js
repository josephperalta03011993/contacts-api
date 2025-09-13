const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

let db;

const connectDb = async () => {
  if (db) return db;
  const client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  db = client.db('cse341db');
  return db;
};

module.exports = { connectDb };
