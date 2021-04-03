// Get an episode by id
//  - If it's not found, redirect to /show/:showId
//  - If it exists, put it into res.locals.episode

module.exports = function (objectRepository) {
  return function (req, res, next) {
    next();
  };
};
