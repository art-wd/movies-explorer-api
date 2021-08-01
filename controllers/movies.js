const Movie = require('../models/movie');

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
    // if (err.name === 'ValidationError') {
    //   next(new BadRequestError('Переданы некорректные данные при создании карточки.'));
    //   return;
    // }
    next(err);
  }
};

module.exports.deleteMovie = async (req, res, next) => {
  try {
    // const movie = await Movie.findById(req.params.cardId);
    // if (!movie) throw new NotFoundError('Карточка с указанным _id не найдена.');

    // if (movie.owner.toString() !== req.user._id) throw new ForbiddenError('Чужая карточка.');

    const deletedMovie = await Movie.findByIdAndDelete(req.params.cardId);
    res.send(deletedMovie);
  } catch (err) {
    // if (err.name === 'CastError') {
    //   next(new BadRequestError('Передан некорректный _id карточки.'));
    //   return;
    // }
    next(err);
  }
};
