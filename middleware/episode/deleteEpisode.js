// Remove an episode from the database
//  - If res.locals.episode exists, remove it from the db
//  - Then redirect to /show/:showId

module.exports = function (objectRepository) {
  return function (req, res, next) {
    next();
  };
};
