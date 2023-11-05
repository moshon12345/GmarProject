const mongoose = require("mongoose");
const { DEFAULT_VALIDATION, URL } = require("../../helpers/mongooseValidators");

const movieSchema = new mongoose.Schema({
  title: {
    type: String
  },
  grade: {
    type: Number
  },
  overview: {
    ...DEFAULT_VALIDATION,
    maxLength: 3024,
  },
  original_language: {
    type: String,
  },
  API_IMG: {
    type: String,
  },
  release_date: {
    type: Date,
  },
  userIsAdmin: {
    type: Boolean,
    default: false
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId
  },
});

const Movie = mongoose.model("movie", movieSchema);

module.exports = Movie;
