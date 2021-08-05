const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const UnauthorizedError = require('../errors/unauthorized-err');
const { UNAUTHORIZED_ERROR } = require('../utils/constants');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) throw new UnauthorizedError(UNAUTHORIZED_ERROR);

  try {
    const payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-super-secret');
    req.user = payload;
    next();
  } catch (err) {
    if (err.toString() === 'JsonWebTokenError: jwt malformed') {
      next(new UnauthorizedError(UNAUTHORIZED_ERROR));
      return;
    }
    next(err);
  }
};
