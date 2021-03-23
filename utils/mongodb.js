import { MongoClient } from "mongodb";

const { MONGODB } = process.env;

if (!MONGODB) {
  throw new Error("Please define the MONGODB environment variable inside .env.local");
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongo;

if (!cached) {
  cached = global.mongo = { conn: null, promise: null };
}

export async function getDatabaseConnection() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    };

    cached.promise = MongoClient.connect(MONGODB, opts).then(client => client.db());
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
