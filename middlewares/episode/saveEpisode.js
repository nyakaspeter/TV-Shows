// Add or update an episode in the database
//  - If res.locals.episode exists update it in the db
//  - If not then save a new entity to the db
//  - Then redirect to /show/:showId/episode/:episodeId

const requireOption = require("../requireOption");

module.exports = function (objectRepository) {
  const Episode = requireOption(objectRepository, "Episode");

  return function (req, res, next) {
    if (
      typeof req.body.title === "undefined" ||
      typeof req.body.season === "undefined" ||
      typeof req.body.number === "undefined"
    ) {
      return next();
    }

    let newEpisode = false;

    if (typeof res.locals.episode === "undefined") {
      res.locals.episode = new Episode();
      newEpisode = true;
    }

    res.locals.episode.title = req.body.title;
    res.locals.episode.season = req.body.season;
    res.locals.episode.number = req.body.number;
    res.locals.episode.airdate = req.body.airdate;
    res.locals.episode.thumbnail = req.body.thumbnail;
    res.locals.episode.synopsis = req.body.synopsis;
    res.locals.episode.favorite = typeof req.body.favorite !== "undefined";

    if (newEpisode) res.locals.show.episodes.push(res.locals.episode);

    res.locals.show
      .save()
      .then(() =>
        res.redirect(
          `/show/${res.locals.show._id}/episode/${res.locals.episode._id}`
        )
      )
      .catch((error) => {
        console.error(error);
        res.redirect(`/show/${res.locals.show._id}`);
      });
  };
};
