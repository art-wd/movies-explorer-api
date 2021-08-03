require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const { PORT = 3000 } = process.env;

const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { mongooseConnectURI, mongooseConnectOptions } = require('./constants/constants');
const errorHandler = require('./middlewares/error-handler');

const app = express();

app.use(helmet());

app.use(requestLogger);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

mongoose.connect(mongooseConnectURI, mongooseConnectOptions);

app.use(router);

app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT);
