const db = require("../config/db");
const Episode = require("./episode");

const Show = db.model("Show", {
  title: { type: String, required: true },
  year: { type: Number, required: true },
  poster: String,
  description: String,
  favorite: Boolean,
  episodes: [Episode.schema],
});

module.exports = Show;
