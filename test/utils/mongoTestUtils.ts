import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient, Db } from 'mongodb';

export interface IMongoTestContext {
  mongoServer: MongoMemoryServer;
  client: MongoClient;
  db: Db;
}

export const setupMongoTest = async (): Promise<IMongoTestContext> => {
  const mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db('test');

  return { mongoServer, client, db };
};

export const teardownMongoTest = async (context: IMongoTestContext): Promise<void> => {
  await context.client.close();
  await context.mongoServer.stop();
};
