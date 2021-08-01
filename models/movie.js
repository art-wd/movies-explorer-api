const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 30,
  },
  director: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 30,
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
    minlength: 4,
    maxlength: 4,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
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
    minlength: 2,
  },
  nameEN: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
});

module.exports = mongoose.model('movie', movieSchema);
