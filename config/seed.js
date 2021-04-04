const fetch = require("node-fetch");
const Show = require("../models/show");
const Episode = require("../models/episode");

const shows = [
  "breaking bad",
  "better call saul",
  "the mandalorian",
  "game of thrones",
  "the walking dead",
  "stranger things",
];

function seed() {
  shows.forEach((query) => {
    const show = new Show();

    fetch(`http://api.tvmaze.com/search/shows?q=${query}`)
      .then((response) => response.json())
      .then((results) => {
        const showJson = results[0].show;

        show.title = showJson.name;
        show.year = showJson.premiered?.split("-")[0];
        show.poster = showJson.image?.original;
        show.description = showJson.summary?.replace(/(<([^>]+)>)/gi, "");
        show.favorite = false;

        fetch(`http://api.tvmaze.com/shows/${showJson.id}/episodes`)
          .then((response) => response.json())
          .then((results) => {
            results.forEach((episodeJson) => {
              const episode = new Episode();
              episode.title = episodeJson.name;
              episode.season = episodeJson.season;
              episode.number = episodeJson.number;
              episode.airdate = episodeJson.airdate;
              episode.thumbnail = episodeJson.image?.original;
              episode.synopsis = episodeJson.summary?.replace(
                /(<([^>]+)>)/gi,
                ""
              );
              episode.favorite = false;

              show.episodes.push(episode);
            });

            Show.exists({ title: show.title }).then(
              (exists) => !exists && show.save()
            );
          });
      })
      .catch((error) => console.log(error));
  });
}

module.exports = seed;
