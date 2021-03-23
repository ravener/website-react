import { getDatabaseConnection } from "../../utils/mongodb";

export default async function (req, res) {
  // Make sure it's a POST request.
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed." });
  }

  const { body } = req;

  // Validate request body.
  if (typeof body !== "string") {
    return res.status(400).json({ message: "Invalid body. Must post a string." });
  }

  // Get database connection.
  const db = await getDatabaseConnection();

  // Generate a unique ID.
  const id = Date.now().toString(36);

  // Insert.
  await db.collection("pastebin").insertOne({ id, body });

  return res.status(200).json({ id });
}
