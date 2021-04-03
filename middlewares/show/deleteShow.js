// Remove a show from the database
//  - If res.locals.show exists, remove it from the db
//  - Then redirect to /

module.exports = function (objectRepository) {
  return function (req, res, next) {
    next();
  };
};
