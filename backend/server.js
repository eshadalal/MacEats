require('dotenv').config({ path: '../.env' }); 
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

app.get('/api/items', async (req, res) => {
  try {
    const items = await itemsCollection.find().toArray();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const { ObjectId } = require('mongodb');

app.put('/api/items/:id/like', async (req, res) => {
  try {
    const id = req.params.id;

    const result = await itemsCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $inc: { likeCount: 1 } },
      { returnDocument: 'after' }
    );

    if (!result.value) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json({ _id: result.value._id, likeCount: result.value.likeCount || 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
