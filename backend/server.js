const express = require("express");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const { Item, connectToDatabase, ensureMenuItems } = require("../lib/mongodb");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "..")));

app.get("/api/items", async (_req, res) => {
  try {
    await connectToDatabase();
    await ensureMenuItems();
    const items = await Item.find({}).sort({ sourceId: 1 }).lean();
    return res.json(items.map((item) => ({ ...item, _id: item.sourceId })));
  } catch (error) {
    console.error("Unable to load menu items:", error);
    return res.status(500).json({ error: "Unable to load menu items" });
  }
});

app.put("/api/items/:id", async (req, res) => {
  try {
    const sourceId = Number(req.params.id);
    if (!Number.isInteger(sourceId) || sourceId < 1) {
      return res.status(400).json({ error: "Invalid item ID" });
    }

    await connectToDatabase();
    const item = await Item.findOneAndUpdate(
      { sourceId },
      { $inc: { likeCount: 1 } },
      { new: true },
    ).lean();

    if (!item) return res.status(404).json({ error: "Item not found" });

    return res.json({ ...item, _id: item.sourceId });
  } catch (error) {
    console.error("Unable to save like:", error);
    return res.status(500).json({ error: "Unable to save like" });
  }
});

app.listen(port, () => {
  console.log(`MacEats is running at http://localhost:${port}`);
});
