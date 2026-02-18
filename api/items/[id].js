import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  name: String,
  tags: [String],
  likeCount: { type: Number, default: 0 },
});

const Item = mongoose.models.Item || mongoose.model("Item", ItemSchema);

async function connectToDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI);
  }
}

export default async function handler(req, res) {
  await connectToDB();
  const { id } = req.query;

  if (req.method === "PUT") {
    const item = await Item.findById(id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.likeCount += 1;
    await item.save();
    res.status(200).json(item);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
