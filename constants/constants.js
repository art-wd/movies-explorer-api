const mongooseConnectURI = 'mongodb://localhost:27017/beatfilmsdb';

const mongooseConnectOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

module.exports = { mongooseConnectURI, mongooseConnectOptions };
