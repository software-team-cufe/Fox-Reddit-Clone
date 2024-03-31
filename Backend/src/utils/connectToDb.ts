import mongoose from 'mongoose';
import config from 'config';
import log from './logger';

async function connectToDb() {
  const mongoUri = config.get<string>('mongoUri');
  try {
    await mongoose.connect(mongoUri);
    log.info('Connected to MongoDB');
  } catch (e) {
    process.exit(1);
  }
}

export default connectToDb;
