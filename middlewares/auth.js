const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

// const { NODE_ENV, JWT_SECRET } = require('../constants/constants');

// const UnauthorizedError = require('../errors/unauthorized-err');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  // const { authorization } = req.headers;
  // if (!authorization) throw new UnauthorizedError('Необходима авторизация.');

  // const token = authorization.replace('Bearer ', '');
  // if (!token) throw new UnauthorizedError('Необходима авторизация.');

  try {
    const payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-super-secret');
    req.user = payload;
    next();
  } catch (err) {
    // if (err.toString() === 'JsonWebTokenError: jwt malformed') {
    //   next(new UnauthorizedError('Необходима авторизация.'));
    //   return;
    // }
    next(err);
  }
};
