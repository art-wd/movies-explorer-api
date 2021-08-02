const Movie = require('../models/movie');

const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const BadRequestError = require('../errors/bad-request-err');

module.exports.getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({});
    res.send(movies);
  } catch (err) {
    next(err);
  }
};

module.exports.createMovie = async (req, res, next) => {
  try {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
    } = req.body;

    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner: req.user._id,
    });
    res.status(201).send(movie);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные при создании фильма.'));
      return;
    }
    next(err);
  }
};

module.exports.deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.cardId);
    if (!movie) throw new NotFoundError('Фильм с указанным id не найдена.');

    if (movie.owner.toString() !== req.user._id) throw new ForbiddenError('Чужой фильм.');

    const deletedMovie = await Movie.findByIdAndDelete(req.params.cardId);
    res.send(deletedMovie);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Передан некорректный id фильма.'));
      return;
    }
    next(err);
  }
};
