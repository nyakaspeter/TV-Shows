const render = require("../middlewares/render");
const getShows = require("../middlewares/show/getShows");
const getShow = require("../middlewares/show/getShow");
const saveShow = require("../middlewares/show/saveShow");
const starShow = require("../middlewares/show/starShow");
const deleteShow = require("../middlewares/show/deleteShow");
const getEpisode = require("../middlewares/episode/getEpisode");
const saveEpisode = require("../middlewares/episode/saveEpisode");
const starEpisode = require("../middlewares/episode/starEpisode");
const deleteEpisode = require("../middlewares/episode/deleteEpisode");

module.exports = function (app) {
  const objectRepository = {
    Show: require("../models/show"),
    Episode: require("../models/episode"),
  };

  // Add a new show
  app.use(
    "/addshow",
    saveShow(objectRepository),
    render(objectRepository, "addeditshow")
  );

  // Get a show and it's episodes
  app.get(
    "/show/:showId",
    getShow(objectRepository),
    render(objectRepository, "viewshow")
  );

  // Edit a show
  app.use(
    "/show/:showId/edit",
    getShow(objectRepository),
    saveShow(objectRepository),
    render(objectRepository, "addeditshow")
  );

  // Star/unstar a show (edit only the favorite property)
  app.get(
    "/show/:showId/star",
    getShow(objectRepository),
    starShow(objectRepository)
  );

  // Delete a show
  app.get(
    "/show/:showId/delete",
    getShow(objectRepository),
    deleteShow(objectRepository)
  );

  // Add a new episode to a show
  app.use(
    "/show/:showId/addepisode",
    getShow(objectRepository),
    saveEpisode(objectRepository),
    render(objectRepository, "addeditepisode")
  );

  // Get an episode of a show
  app.get(
    "/show/:showId/episode/:episodeId",
    getShow(objectRepository),
    getEpisode(objectRepository),
    render(objectRepository, "viewepisode")
  );

  // Edit an episode of a show
  app.use(
    "/show/:showId/episode/:episodeId/edit",
    getShow(objectRepository),
    getEpisode(objectRepository),
    saveEpisode(objectRepository),
    render(objectRepository, "addeditepisode")
  );

  // Star/unstar an episode of a show (edit only the favorite property)
  app.get(
    "/show/:showId/episode/:episodeId/star",
    getShow(objectRepository),
    getEpisode(objectRepository),
    starEpisode(objectRepository)
  );

  // Delete an episode of a show
  app.get(
    "/show/:showId/episode/:episodeId/delete",
    getShow(objectRepository),
    getEpisode(objectRepository),
    deleteEpisode(objectRepository)
  );

  // Get all shows
  app.use("/", getShows(objectRepository), render(objectRepository, "index"));
};
