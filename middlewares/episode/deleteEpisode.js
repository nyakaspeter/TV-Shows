// Remove an episode from the database
//  - Remove res.locals.episode from the db
//  - Then redirect to /show/:showId

module.exports = function (objectRepository) {
  return function (req, res, next) {
    res.locals.episode.remove();

    res.locals.show
      .save()
      .then(() => res.redirect(`/show/${req.params.showId}`))
      .catch((error) => {
        console.error(error);
        res.redirect(`/show/${req.params.showId}`);
      });
  };
};
