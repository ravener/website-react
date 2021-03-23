import { MongoClient } from "mongodb";

let cachedDb = null;

async function getDatabaseConnection() {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = await client.db();

  cachedDb = db;
  return db;
}

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
