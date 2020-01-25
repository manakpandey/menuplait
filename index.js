const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const logger = require('./winston');
const { dbUrl } = require('./config');
const router = require('./routes/menu.route');

const app = express();
const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', router);

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('Successful connection to Database');
  })
  .catch((error) => {
    logger.error(`Connection Error: ${error}`);
  });

app.listen(port, () => logger.info(`App Listening on port ${port}`));
