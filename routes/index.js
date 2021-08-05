const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { createUser, login, logout } = require('../controllers/users');

const users = require('./users');
const movies = require('./movies');

const auth = require('../middlewares/auth');

const NotFoundError = require('../errors/not-found-err');
const { ROUT_NOT_FOUND_ERROR } = require('../utils/constants');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().min(2).max(30),
  }),
}), createUser);
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
}), login);

router.use(auth);

router.use('/users', users);
router.use('/movies', movies);

router.post('/signout', logout);

router.use('*', () => { throw new NotFoundError(ROUT_NOT_FOUND_ERROR); });

module.exports = router;
