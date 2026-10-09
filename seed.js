require("dotenv").config();
const mongoose = require("mongoose");
const items = require('./items.json');
const { connectToDatabase, seedMenuItems } = require("./lib/mongodb");

async function seed() {
  try {
    await connectToDatabase();
    const result = await seedMenuItems();
    console.log(`Menu seed complete: ${items.length} items processed (${result.upsertedCount} inserted).`);
  } catch (err) {
    console.error("Unable to seed menu data:", err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seed();
