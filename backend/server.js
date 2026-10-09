const express = require("express");
const path = require("path");
const menuItems = require("../items.json");

const app = express();
const port = process.env.PORT || 3000;
const items = menuItems.map((item) => ({ ...item, _id: String(item.id), likeCount: item.likeCount || 0 }));

app.use(express.json());
app.use(express.static(path.join(__dirname, "..")));

app.get("/api/items", (_req, res) => {
  res.json(items);
});

app.put("/api/items/:id", (req, res) => {
  const item = items.find((candidate) => candidate._id === req.params.id);
  if (!item) return res.status(404).json({ error: "Item not found" });

  item.likeCount += 1;
  return res.json(item);
});

app.listen(port, () => {
  console.log(`MacEats is running at http://localhost:${port}`);
});
