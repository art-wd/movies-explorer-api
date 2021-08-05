const Movie = require('../models/movie');

const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const BadRequestError = require('../errors/bad-request-err');

const {
  FILM_DATA_CREATE_BAD_REQUEST_ERROR,
  FILM_ID_NOT_FOUND_ERROR,
  FILM_OWNER_ID_FORBIDDEN_ERROR,
  FILM_ID_DELETE_BAD_REQUEST_ERROR,
} = require('../utils/constants');

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
      next(new BadRequestError(FILM_DATA_CREATE_BAD_REQUEST_ERROR));
      return;
    }
    next(err);
  }
};

module.exports.deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.movieId);
    if (!movie) throw new NotFoundError(FILM_ID_NOT_FOUND_ERROR);

    if (movie.owner.toString() !== req.user._id) {
      throw new ForbiddenError(FILM_OWNER_ID_FORBIDDEN_ERROR);
    }

    const deletedMovie = await Movie.findByIdAndDelete(req.params.movieId);
    res.send(deletedMovie);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError(FILM_ID_DELETE_BAD_REQUEST_ERROR));
      return;
    }
    next(err);
  }
};
