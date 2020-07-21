const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../app");

chai.use(chaiHttp);

describe("Node Server", () => {
  it("Check Home Pages", (done) => {
    chai
      .request(server)
      .get("/")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe("Check Put Data", () => {
  const event = {
    eventDate: "1919-09-19",
  };

  it("Add New Event", (done) => {
    chai
      .request(server)
      .put("/events/add")
      .send(event)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
