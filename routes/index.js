const router = require('express').Router();

const users = require('./users');
const movies = require('./movies');

const auth = require('../middlewares/auth');

router.use(auth, users);
router.use(auth, movies);

module.exports = router;
