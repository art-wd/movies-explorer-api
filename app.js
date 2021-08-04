require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');

const { PORT = 3000 } = process.env;

const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');

const { mongooseConnectURI, mongooseConnectOptions } = require('./utils/constants');
const errorHandler = require('./middlewares/error-handler');

const app = express();

app.use(helmet());

app.use(requestLogger);
app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

mongoose.connect(mongooseConnectURI, mongooseConnectOptions);

app.use(cors({
  origin: [
    'https://chagin.movies.nomoredomains.club',
    'http://chagin.movies.nomoredomains.club',
    'localhost:3000',
  ],
  credentials: true,
}));

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
