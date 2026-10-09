const { Item, connectToDatabase } = require("../../lib/mongodb");

module.exports = async function handler(req, res) {
  if (req.method !== "PUT") {
    res.setHeader("Allow", "PUT");
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const sourceId = Number(req.query.id);
    if (!Number.isInteger(sourceId) || sourceId < 1) {
      return res.status(400).json({ message: "Invalid item ID" });
    }

    await connectToDatabase();
    const item = await Item.findOneAndUpdate(
      { sourceId },
      { $inc: { likeCount: 1 } },
      { new: true },
    ).lean();

    if (!item) return res.status(404).json({ message: "Item not found" });

    return res.status(200).json({ ...item, _id: item.sourceId });
  } catch (error) {
    console.error("Unable to save like:", error);
    return res.status(500).json({ message: "Unable to save like" });
  }
};
