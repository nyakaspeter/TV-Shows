// Add or update a show in the database
//  - If res.locals.show exists update it in the db
//  - If not then save a new entity to the db
//  - Then redirect to /

module.exports = function (objectRepository) {
  return function (req, res, next) {
    next();
  };
};
