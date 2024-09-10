import 'dotenv/config';
import { MongoClient } from 'mongodb';

const mongoURL = process.env.MONGO_URL;
const mongoClient = new MongoClient(mongoURL)

try {
  await mongoClient.connect();
  console.log('Connected Database');
} catch (err) {
  console.log(err.message);
}

export const db = mongoClient.db();