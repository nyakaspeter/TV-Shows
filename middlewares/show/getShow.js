// Get a show by id
//  - If it exists, put it into res.locals.show
//  - If it's not found, redirect to /

const requireOption = require("../requireOption");

module.exports = function (objectRepository) {
  const Show = requireOption(objectRepository, "Show");

  return function (req, res, next) {
    Show.findById(req.params.showId)
      .then((show) => {
        res.locals.show = show;
        next();
      })
      .catch((error) => {
        console.error(error);
        res.redirect("/");
      });
  };
};
