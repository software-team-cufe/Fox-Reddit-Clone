import mongoose from 'mongoose';
import config from 'config';

async function connectToDb() {
  const mongoUri = config.get('mongoUri');
  try {
    await mongoose.connect(config.get('mongoUri'), {});
  } catch (e) {
    process.exit(1);
  }
}

export default connectToDb;
