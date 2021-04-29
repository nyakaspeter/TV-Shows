const chai = require("chai");
chai.should();

const getEpisode = require("../../../../middlewares/episode/getEpisode");

const reqMock = {
  params: {
    showId: "1",
    episodeId: "2",
  },
};

describe("getEpisode middleware ", function () {
  it("should put the episode to res.locals, if it exists", function (done) {
    const mw = getEpisode({});

    const resMock = {
      locals: {
        show: {
          _id: "1",
          episodes: [
            {
              _id: "1",
              title: "mock ep 1",
            },
            {
              _id: "2",
              title: "mock ep 2",
            },
          ],
        },
      },
      redirect: (path) => {
        done("this should not have been called");
      },
    };

    mw(reqMock, resMock, () => {
      try {
        resMock.locals.episode.should.be.eql({
          _id: "2",
          title: "mock ep 2",
        });
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  it("should redirect to /show/:showId, if the episode is not found", function (done) {
    const mw = getEpisode({});

    const resMock = {
      locals: {
        show: {
          _id: "1",
          episodes: [],
        },
      },
      redirect: (path) => {
        try {
          path.should.be.eql("/show/1");
          done();
        } catch (err) {
          done(err);
        }
      },
    };

    mw(reqMock, resMock, () => {
      done("this should not have been called");
    });
  });
});
