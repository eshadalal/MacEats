require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');
const items = require('./items.json');

async function seed() {
  console.log("Mongo URI:", process.env.MONGO_URI);
  const client = new MongoClient(process.env.MONGO_URI);

  try {
    await client.connect();
    const db = client.db("mydb");
    const collection = db.collection("items");
    await collection.deleteMany({});
    const itemsWithIds = items.map(item => ({ ...item, _id: new ObjectId() }));
    await collection.insertMany(itemsWithIds);
    console.log("Items inserted:", itemsWithIds.length);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

seed();
