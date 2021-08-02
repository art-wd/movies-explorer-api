const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-err');
const BadRequestError = require('../errors/bad-request-err');
const UnauthorizedError = require('../errors/unauthorized-err');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) throw new NotFoundError('Пользователь с указанным id не найден.');
    res.send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Передан некорректный id при получении пользователя.'));
      return;
    }
    next(err);
  }
};

module.exports.updateCurrentUser = async (req, res, next) => {
  try {
    const { email, name } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { email, name },
      { new: true, runValidators: true },
    );
    if (!user) throw new NotFoundError('Пользователь с указанным id не найден.');

    res.send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Передан некорректный id при обновлении профиля.'));
      return;
    }
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные при обновлении профиля.'));
      return;
    }
    next(err);
  }
};

module.exports.createUser = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const hash = await bcrypt.hash(password, 10);

    await User.create({ email, password: hash, name });

    const user = await User.findOne({ email });
    res.status(201).send(user);
  } catch (err) {
    if (err.name === 'MongoError' && err.code === 11000) {
      next(new ConflictError('Такой e-mail уже существует.'));
      return;
    }
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные при создании пользователя.'));
      return;
    }
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await this.findOne({ email }).select('+password');
    if (!user) throw new UnauthorizedError('Неправильные почта или пароль.');

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) throw new UnauthorizedError('Неправильные почта или пароль.');

    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-super-secret',
      { expiresIn: '7d' },
    );

    res.cookie(
      'jwt',
      token,
      { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: true },
    ).send({ message: 'Aвторизация прошла успешно.' });
  } catch (err) {
    next(err);
  }
};

module.exports.logout = async (req, res, next) => {
  try {
    res.clearCookie('jwt').send({ message: 'Выход прошёл успешно.' });
  } catch (err) {
    next(err);
  }
};
