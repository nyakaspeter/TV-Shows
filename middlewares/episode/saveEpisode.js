// Add or update an episode in the database
//  - If res.locals.episode exists update it in the db
//  - If not then save a new entity to the db
//  - Then redirect to /show/:showId

module.exports = function (objectRepository) {
  return function (req, res, next) {
    console.log(req.body);
    next();
  };
};
