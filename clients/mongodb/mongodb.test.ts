import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MongoClient, Db } from 'mongodb';

vi.mock('mongodb', () => {
  const mockDb = {
    collection: vi.fn(),
  };

  const MockMongoClient = vi.fn(function(this: any) {
    this.connect = vi.fn().mockResolvedValue(undefined);
    this.db = vi.fn().mockReturnValue(mockDb);
    this.close = vi.fn().mockResolvedValue(undefined);
    return this;
  });

  return {
    MongoClient: MockMongoClient,
  };
});

vi.mock('@/services/config/config.service', () => ({
  getMongoDbUri: vi.fn(() => 'mongodb://localhost:27017/test'),
}));

describe('mongodb client', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    await vi.resetModules();
  });

  it('should connect to MongoDB on first call', async () => {
    const { connectToMongo } = await import('./mongodb');

    const db = await connectToMongo();

    expect(db).toBeDefined();
    expect(MongoClient).toHaveBeenCalledTimes(1);
    expect(MongoClient).toHaveBeenCalledWith('mongodb://localhost:27017/test');
  });

  it('should return cached connection on subsequent calls', async () => {
    const { connectToMongo } = await import('./mongodb');

    const db1 = await connectToMongo();
    const db2 = await connectToMongo();

    expect(db1).toBe(db2);
    expect(MongoClient).toHaveBeenCalledTimes(1);
  });

  it('should call connect method on client', async () => {
    const { connectToMongo } = await import('./mongodb');

    await connectToMongo();

    const mockClientInstance = vi.mocked(MongoClient).mock.results[0].value;
    expect(mockClientInstance.connect).toHaveBeenCalledTimes(1);
  });

  it('should call db method on client', async () => {
    const { connectToMongo } = await import('./mongodb');

    await connectToMongo();

    const mockClientInstance = vi.mocked(MongoClient).mock.results[0].value;
    expect(mockClientInstance.db).toHaveBeenCalledTimes(1);
  });
});
