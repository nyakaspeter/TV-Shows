// Get the show list and put it into res.locals.shows

const Show = require("../../models/show");

module.exports = function (objectRepository) {
  return function (req, res, next) {
    Show.find(
      typeof req.body.title !== "undefined"
        ? { title: { $regex: req.body.title, $options: "i" } }
        : {},
      "title poster favorite"
    ).then((shows) => {
      res.locals.shows = shows;
      next();
    });
  };
};
