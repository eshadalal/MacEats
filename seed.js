require('dotenv').config();
const { MongoClient } = require('mongodb');
const items = require('./items.json');

async function seed() {
  console.log("Mongo URI:", process.env.MONGO_URI);
  const client = new MongoClient(process.env.MONGO_URI);

  try {
    await client.connect();
    const db = client.db("mydb");
    const collection = db.collection("items");
    await collection.deleteMany({});
    await collection.insertMany(items);
    console.log("Items inserted:", items.length);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

seed();
