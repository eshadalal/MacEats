const mongoose = require("mongoose");
const menuItems = require("../items.json");

const cached = global.mongooseConnection || { connection: null, promise: null };
global.mongooseConnection = cached;

const itemSchema = new mongoose.Schema(
  {
    sourceId: { type: Number, required: true, unique: true, index: true },
    name: { type: String, required: true },
    tags: { type: [String], default: [] },
    likeCount: { type: Number, default: 0, min: 0 },
  },
  { versionKey: false },
);

const Item = mongoose.models.Item || mongoose.model("Item", itemSchema);

async function connectToDatabase() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not configured.");
  }

  if (cached.connection) return cached.connection;

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    });
  }

  try {
    cached.connection = await cached.promise;
    return cached.connection;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
}

function menuItemOperations() {
  return menuItems.map((item) => ({
    updateOne: {
      filter: { sourceId: item.id },
      update: {
        $set: { name: item.name, tags: item.tags },
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
  if (await Item.estimatedDocumentCount() === 0) {
    await seedMenuItems();
  }
}

module.exports = { Item, connectToDatabase, ensureMenuItems, seedMenuItems };
