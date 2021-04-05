// Toggle favorite property of an episode
//  - Change favorite property of res.locals.episode in the db
//  - Then redirect back to origin

module.exports = function (objectRepository) {
  return function (req, res, next) {
    res.locals.episode.favorite = !res.locals.episode.favorite;

    res.locals.show
      .save()
      .then(() => res.redirect("back"))
      .catch(() => res.redirect("back"));
  };
};
