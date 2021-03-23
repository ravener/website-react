import { getDatabaseConnection } from "../../utils/mongodb";

export default async (req, res) => {
  const db = await getDatabaseConnection();
  const { query: { id } } = req;

  const doc = await db.collection("pastebin").findOne({ id }, {
    projection: { _id: 0 }
  });

  if (!doc) {
    return res.status(404).json({ message: "Not Found" });
  }

  return res.status(200).json(doc);
}
