const db = require("../config/db");
const Episode = require("./episode");

const Show = db.model("Show", {
  title: String,
  year: Number,
  poster: String,
  description: String,
  favorite: Boolean,
  episodes: [Episode.schema],
});

module.exports = Show;
