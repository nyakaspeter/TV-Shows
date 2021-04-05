const db = require("../config/db");

const Episode = db.model("Episode", {
  title: { type: String, required: true },
  season: { type: Number, required: true },
  number: { type: Number, required: true },
  airdate: Date,
  thumbnail: String,
  synopsis: String,
  favorite: Boolean,
});

module.exports = Episode;
