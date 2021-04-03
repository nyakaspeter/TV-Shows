// Render the values into the template

module.exports = function (objectRepository, viewName) {
  return function (req, res, next) {
    res.render(viewName, res.locals);
  };
};
