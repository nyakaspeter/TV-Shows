const chai = require("chai");
chai.should();

const saveShow = require("../../../../middlewares/show/saveShow");

describe("saveShow middleware ", function () {
  it("should create the show, if it does not exist, then redirect to /show/:showId", function (done) {
    class MockShowModel {
      constructor() {
        this._id = "1";
        this.save = () => Promise.resolve();
      }
    }

    const mw = saveShow({ Show: MockShowModel });

    const reqMock = {
      body: {
        title: "mock show",
        year: "2021",
      },
    };

    const resMock = {
      locals: {},
      redirect: (path) => {
        try {
          resMock.locals.show.should.be.instanceOf(MockShowModel);
          resMock.locals.show.title.should.be.eql("mock show");
          resMock.locals.show.year.should.be.eql("2021");
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

  it("should update the show, if it exists, then redirect to /show/:showId", function (done) {
    const mw = saveShow({ Show: {} });

    const reqMock = {
      body: {
        title: "new title",
        year: "2021",
      },
    };

    const resMock = {
      locals: {
        show: {
          _id: "1",
          title: "old title",
          year: "2020",
          poster: "poster link",
          description: "good show",
          favorite: true,
          save: () => Promise.resolve(),
        },
      },
      redirect: (path) => {
        try {
          resMock.locals.show.title.should.be.eql("new title");
          resMock.locals.show.year.should.be.eql("2021");
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

  it("should call next, if any required field is missing", function (done) {
    const mw = saveShow({ Show: {} });

    const reqMock = {
      body: {
        title: "mock show",
      },
    };

    const resMock = {
      locals: {
        show: {
          save: () => Promise.resolve(),
        },
      },
      redirect: (path) => {
        done("this should not have been called");
      },
    };

    mw(reqMock, resMock, () => {
      done();
    });
  });

  it("should redirect to /, if saving fails", function (done) {
    const mw = saveShow({ Show: {} });

    const reqMock = {
      body: {
        title: "mock show",
        year: "2021",
      },
    };

    const resMock = {
      locals: {
        show: {
          save: () => Promise.reject("printing mocked error"),
        },
      },
      redirect: (path) => {
        try {
          path.should.be.eql("/");
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
