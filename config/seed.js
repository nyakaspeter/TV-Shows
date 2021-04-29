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
  shows.forEach(async (query) => {
    try {
      const show = new Show();

      const showResponse = await fetch(
        `http://api.tvmaze.com/search/shows?q=${query}`
      );
      const showJson = (await showResponse.json())[0].show;

      show.title = showJson.name;
      show.year = showJson.premiered?.split("-")[0];
      show.poster = showJson.image?.original;
      show.description = showJson.summary?.replace(/(<([^>]+)>)/gi, "");
      show.favorite = false;

      const episodesResponse = await fetch(
        `http://api.tvmaze.com/shows/${showJson.id}/episodes`
      );
      const episodesJson = await episodesResponse.json();

      episodesJson.forEach((episodeJson) => {
        const episode = new Episode();
        episode.title = episodeJson.name;
        episode.season = episodeJson.season;
        episode.number = episodeJson.number;
        episode.airdate = episodeJson.airdate;
        episode.thumbnail = episodeJson.image?.original;
        episode.synopsis = episodeJson.summary?.replace(/(<([^>]+)>)/gi, "");
        episode.favorite = false;

        show.episodes.push(episode);
      });

      if (!(await Show.exists({ title: show.title }))) show.save();
    } catch (error) {
      console.error(error);
    }
  });
}

module.exports = seed;
