const render = require("./middleware/render");
const getShows = require("./middleware/show/getShows");
const getShow = require("./middleware/show/getShow");
const saveShow = require("./middleware/show/saveShow");
const deleteShow = require("./middleware/show/deleteShow");
const getEpisodes = require("./middleware/episode/getEpisodes");
const getEpisode = require("./middleware/episode/getEpisode");
const saveEpisode = require("./middleware/episode/saveEpisode");
const deleteEpisode = require("./middleware/episode/deleteEpisode");

module.exports = function (app) {
  const objectRepository = {};

  // Get all shows
  app.get("/", getShows(objectRepository), render(objectRepository, "index"));

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
    getEpisodes(objectRepository),
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
  app.post(
    "/show/:showId/star",
    getShow(objectRepository),
    saveShow(objectRepository)
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
  app.post(
    "/show/:showId/episode/:episodeId/star",
    getShow(objectRepository),
    getEpisode(objectRepository),
    saveEpisode(objectRepository)
  );

  // Delete an episode of a show
  app.get(
    "/show/:showId/episode/:episodeId/delete",
    getShow(objectRepository),
    getEpisode(objectRepository),
    deleteEpisode(objectRepository)
  );
};
