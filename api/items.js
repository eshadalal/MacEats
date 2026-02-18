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

  if (req.method === "GET") {
    const items = await Item.find({});
    res.status(200).json(items);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
