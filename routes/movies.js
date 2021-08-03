const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(/(https?:\/\/)(www\.)?([\w\d\-._~:/?#[\]@!$&'()*+,;=])+/).required(),
    trailer: Joi.string().pattern(/(https?:\/\/)(www\.)?([\w\d\-._~:/?#[\]@!$&'()*+,;=])+/).required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().pattern(/(https?:\/\/)(www\.)?([\w\d\-._~:/?#[\]@!$&'()*+,;=])+/).required(),
    movieId: Joi.number().required(),
  }),
}), createMovie);
router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24).required(),
  }),
}), deleteMovie);

module.exports = router;
