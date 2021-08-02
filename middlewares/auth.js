const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const UnauthorizedError = require('../errors/unauthorized-err');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) throw new UnauthorizedError('Необходима авторизация.');

  try {
    const payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-super-secret');
    req.user = payload;
    next();
  } catch (err) {
    if (err.toString() === 'JsonWebTokenError: jwt malformed') {
      next(new UnauthorizedError('Необходима авторизация.'));
      return;
    }
    next(err);
  }
};
