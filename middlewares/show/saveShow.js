// Add or update a show in the database
//  - If res.locals.show exists update it in the db
//  - If not then save a new entity to the db
//  - Then redirect to /show/:showId

const Show = require("../../models/show");

module.exports = function (objectRepository) {
  return function (req, res, next) {
    if (
      typeof req.body.title === "undefined" ||
      typeof req.body.year === "undefined"
    ) {
      return next();
    }

    if (typeof res.locals.show === "undefined") {
      res.locals.show = new Show();
    }

    res.locals.show.title = req.body.title;
    res.locals.show.year = req.body.year;
    res.locals.show.poster = req.body.poster;
    res.locals.show.description = req.body.description;
    res.locals.show.favorite = typeof req.body.favorite !== "undefined";

    res.locals.show
      .save()
      .then(() => {
        return res.redirect(`/show/${res.locals.show._id}`);
      })
      .catch((error) => res.redirect("/"));
  };
};
