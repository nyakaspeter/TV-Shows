// Get the show list and put it into res.locals.shows

const requireOption = require("../requireOption");

module.exports = function (objectRepository) {
  const Show = requireOption(objectRepository, "Show");

  return function (req, res, next) {
    Show.find(
      typeof req.body.title !== "undefined"
        ? { title: { $regex: req.body.title, $options: "i" } }
        : {},
      "title poster favorite"
    )
      .then((shows) => {
        res.locals.shows = shows;
        res.locals.title = req.body.title;
        next();
      })
      .catch((error) => {
        console.error(error);
        res.status(404).end();
      });
  };
};
