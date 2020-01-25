const express = require('express');
const logger = require('./winston');

const app = express();
const port = 3000;

app.listen(port, () => logger.info(`App Listening on port ${port}`));
