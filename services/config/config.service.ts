export const getMongoDbUri = (): string => {
  const uri = process.env.MONGODB_URI;

  if (!uri || !uri.trim()) {
    throw new Error('MONGODB_URI environment variable is required');
  }

  if (!uri.startsWith('mongodb://') && !uri.startsWith('mongodb+srv://')) {
    throw new Error('MONGODB_URI must start with mongodb:// or mongodb+srv://');
  }

  return uri;
};
