const { Item, connectToDatabase, ensureMenuItems } = require("../lib/mongodb");

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectToDatabase();
    await ensureMenuItems();
    const items = await Item.find({}).sort({ sourceId: 1 }).lean();
    return res.status(200).json(
      items.map((item) => ({
        ...item,
        _id: item.sourceId,
      })),
    );
  } catch (error) {
    console.error("Unable to load menu items:", error);
    return res.status(500).json({ message: "Unable to load menu items" });
  }
};
