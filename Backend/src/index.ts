/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
import express from 'express';
import cors from 'cors';
import config from 'config';
import log from './utils/logger';
import connectToDb from './utils/connectToDb';
import router from './routes/index';
import deserializeUser from '../src/middleware/deserialzeUser';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3001',
    credentials: true,
  })
);
app.use(express.json());
app.use(deserializeUser);
app.use(router);

const port = config.get<number>('port');

app.listen(port, () => {
  log.info(`App is running on http://localhost:${port}`);
  connectToDb();
});
