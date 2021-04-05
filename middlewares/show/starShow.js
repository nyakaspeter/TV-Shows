// Toggle favorite property of a show
//  - Change favorite property of res.locals.show in the db
//  - Then redirect back to origin

module.exports = function (objectRepository) {
  return function (req, res, next) {
    res.locals.show.favorite = !res.locals.show.favorite;

    res.locals.show
      .save()
      .then(() => res.redirect("back"))
      .catch(() => res.redirect("back"));
  };
};
