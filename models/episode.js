const db = require("../config/db");

const Episode = db.model("Episode", {
  title: String,
  season: Number,
  number: Number,
  airdate: Date,
  thumbnail: String,
  synopsis: String,
  favorite: Boolean,
});

module.exports = Episode;
