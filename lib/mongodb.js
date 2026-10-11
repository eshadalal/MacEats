const mongoose = require("mongoose");
const menuItems = require("../items.json");

const cached = global.mongooseConnection || { connection: null, promise: null };
global.mongooseConnection = cached;

const itemSchema = new mongoose.Schema(
  {
    sourceId: { type: Number, required: true, unique: true, index: true },
    name: { type: String, required: true },
    tags: { type: [String], default: [] },
    price: { type: String, required: true },
    likeCount: { type: Number, default: 0, min: 0 },
  },
  { versionKey: false },
);

const Item = mongoose.models.Item || mongoose.model("Item", itemSchema);

async function connectToDatabase() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not configured.");
  }

  if (mongoose.connection.readyState === 1) {
    cached.connection = mongoose.connection;
    return cached.connection;
  }

  // Serverless instances can outlive an Atlas connection. Do not reuse a
  // resolved connection promise unless Mongoose still reports it as connected.
  if (mongoose.connection.readyState !== 2) {
    cached.connection = null;
    cached.promise = null;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: false,
      connectTimeoutMS: 10000,
      serverSelectionTimeoutMS: 10000,
    });
  }

  try {
    cached.connection = await cached.promise;
    return cached.connection;
  } catch (error) {
    cached.connection = null;
    cached.promise = null;
    throw error;
  }
}

function menuItemOperations() {
  return menuItems.map((item) => ({
    updateOne: {
      filter: { sourceId: item.id },
      update: {
        $set: { name: item.name, tags: item.tags, price: item.price },
        $setOnInsert: { likeCount: 0 },
      },
      upsert: true,
    },
  }));
}

async function seedMenuItems() {
  return Item.bulkWrite(menuItemOperations());
}

async function ensureMenuItems() {
  const [hasItems, itemMissingPrice] = await Promise.all([
    Item.exists({}),
    Item.exists({ price: { $exists: false } }),
  ]);

  if (!hasItems || itemMissingPrice) {
    await seedMenuItems();
  }
}

module.exports = { Item, connectToDatabase, ensureMenuItems, seedMenuItems };
