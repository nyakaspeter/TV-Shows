// Remove a show from the database
//  - Remove res.locals.show from the db
//  - Then redirect to /

module.exports = function (objectRepository) {
  return function (req, res, next) {
    res.locals.show.remove().then(() => res.redirect("/"));
  };
};
