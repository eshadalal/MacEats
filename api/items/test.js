export default function handler(req, res) {
  res.status(200).json({ mongoURI: process.env.MONGO_URI ? "set" : "missing" });
}
