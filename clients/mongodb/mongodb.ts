import { MongoClient, Db } from 'mongodb';
import { getMongoDbUri } from '@/services/config/config.service';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export const connectToMongo = async (): Promise<Db> => {
  if (cachedClient && cachedDb) {
    return cachedDb;
  }

  const uri = getMongoDbUri();
  const client = new MongoClient(uri);

  await client.connect();

  const db = client.db();

  cachedClient = client;
  cachedDb = db;

  return db;
};
