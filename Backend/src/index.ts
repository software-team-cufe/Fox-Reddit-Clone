/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
import express from 'express';
import config from 'config';
import log from './utils/logger';
import connectToDb from './utils/connectToDb';
import router from './routes/index';
import { TokenExpiredError } from 'jsonwebtoken';
const app = express();

app.use(express.json());
app.use(router);

const port = config.get<number>('port');

app.listen(port, () => {
  log.info(`App is running on http://localhost:${port}`);
  connectToDb();
});
