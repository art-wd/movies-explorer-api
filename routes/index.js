const router = require('express').Router();

const { createUser, login, logout } = require('../controllers/users');

const users = require('./users');
const movies = require('./movies');

const auth = require('../middlewares/auth');

const NotFoundError = require('../errors/not-found-err');

router.post('/signup', createUser);
router.post('/signin', login);

router.use(auth);

router.use('/users', users);
router.use('/movies', movies);

router.post('/signout', logout);

router.use('*', () => { throw new NotFoundError('Запрошен несуществующий роут.'); });

module.exports = router;
