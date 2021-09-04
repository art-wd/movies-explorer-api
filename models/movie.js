const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    trim: true,
  },
  director: {
    type: String,
    required: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: true,
    validate: (v) => v > 0,
  },
  year: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
    trim: true,
    validate: (v) => validator.isURL(v),
  },
  trailer: {
    type: String,
    required: true,
    trim: true,
    validate: (v) => validator.isURL(v),
  },
  thumbnail: {
    type: String,
    required: true,
    trim: true,
    validate: (v) => validator.isURL(v),
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    trim: true,
  },
  nameEN: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
