// Get an episode by id
//  - If it exists, put it into res.locals.episode
//  - If it's not found, redirect to /show/:showId

module.exports = function (objectRepository) {
  return function (req, res, next) {
    const episode = res.locals.show.episodes.find(
      (episode) => episode._id == req.params.episodeId
    );

    if (episode) {
      res.locals.episode = episode;
      next();
    } else {
      res.redirect(`/show/${req.params.showId}`);
    }
  };
};
