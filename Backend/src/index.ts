require('dotenv').config();
import express from 'express';
import config from 'config';
import log from '@src/utils/logger';
import connectToDb from '@src/utils/connectToDb';
import router from '@src/routes';
const app = express();

app.use(router);

const port = config.get('port');

app.listen(port, () => {
  log.info(`App is running on http://localhost:${port}`);
  connectToDb();
});
