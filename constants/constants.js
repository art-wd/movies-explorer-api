const mongooseConnectURI = 'mongodb://localhost:27017/beatfilmsdb';

const mongooseConnectOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

const allowedCors = [
  'localhost:3000',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = {
  mongooseConnectURI,
  mongooseConnectOptions,
  allowedCors,
  DEFAULT_ALLOWED_METHODS,
};
