require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);
const dbName = 'mydb';
let itemsCollection;

async function startServer() {
  try {
    await client.connect();
    const db = client.db(dbName);
    itemsCollection = db.collection('items');
    console.log('Connected to MongoDB');

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
  }
}

startServer();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.get('/items', async (req, res) => {
  try {
    const items = await itemsCollection.find().toArray();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
