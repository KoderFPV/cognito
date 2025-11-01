import { Db, ObjectId } from 'mongodb';
import { IUser } from '@/domain/user';

export const findUserByEmail = async (
  db: Db,
  email: string
): Promise<IUser | null> => {
  const collection = db.collection<IUser>('users');
  return collection.findOne({ email, deleted: false });
};

export const findUserById = async (
  db: Db,
  id: string
): Promise<IUser | null> => {
  const collection = db.collection<IUser>('users');

  try {
    const objectId = new ObjectId(id);
    const user = await collection.findOne({ _id: objectId as any, deleted: false });

    if (!user) {
      return null;
    }

    return {
      ...user,
      _id: user._id.toString(),
    };
  } catch {
    return null;
  }
};

export const createUser = async (
  db: Db,
  userData: Omit<IUser, '_id'>
): Promise<IUser> => {
  const collection = db.collection<IUser>('users');
  const result = await collection.insertOne(userData as any);

  return {
    ...userData,
    _id: result.insertedId.toString(),
  };
};
