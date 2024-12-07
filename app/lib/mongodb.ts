import mongoose from 'mongoose';

declare global {
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  } | undefined;
}

const MONGODB_URI = process.env.DATABASE_URL;

if (!MONGODB_URI) {
  throw new Error('Please define the DATABASE_URL environment variable');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  try {
    if (cached!.conn) {
      console.log('Using cached connection');
      return cached!.conn;
    }

    if (!cached!.promise) {
      const opts = {
        bufferCommands: false,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      };

      cached!.promise = mongoose.connect(MONGODB_URI!, opts).then(() => cached!);
    }

    cached!.conn = await cached!.promise;
    console.log('New connection established');
    return cached!.conn;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    cached!.promise = null;
    throw error;
  }
}

export default dbConnect; 