import mongoose from 'mongoose';
import config from 'config';
import log from './logger';
import { seedCommunity } from '../seeds/seedCommunity';

/**
 * Connects to the MongoDB database using the provided mongoUri.
 *
 * @returns {Promise<void>} A promise that resolves when the connection is successful.
 * @throws {Error} If the connection to the database fails.
 */
async function connectToDb() {
  const mongoUri = config.get<string>('mongoUri');
  try {
    await mongoose.connect(mongoUri);
    log.info('Connected to MongoDB');

    //call seeding function to seed the database
    // await seedCommunity();
    //log.info('Database seeded');
  } catch (e) {
    // log.error('Error connecting to database or seeding:', e);
    process.exit(1);
  }
}

export default connectToDb;
