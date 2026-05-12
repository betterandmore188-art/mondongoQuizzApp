import { MongoClient } from "mongodb";

declare global {
  // Allows caching the MongoClient promise across hot-reloads in development
  // without TypeScript complaining about an unknown property on `global`.
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}
