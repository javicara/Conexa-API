//chai- mocha
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const should = chai.should();

const User = require("../models/user");

// test to see if the user is created
chai.use(chaiHttp);

describe("User", () => {
  beforeEach((done) => {
    User.deleteMany({}, (err) => {
      done();
    });
  });
  describe("/POST user", () => {
    it("it should not POST a user without email field", (done) => {
      let user = {
        name: "Johsn",
        password: "123456",
      };
      chai
        .request(app)
        .post("/api/users/signup")
        .send(user)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a("object");
          res.body.should.have.property("errors");
          res.body.errors.should.have.property("email");
          res.body.errors.email.should.have.property("kind").eql("required");
          done();
        });
    });
    it("it should POST a user ", (done) => {
      let user = {
        name: "asd",
        email: "juasdasan@test.com,",
        password: "123456",
      };
      chai
        .request(app)
        .post("/api/users/signup")
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          //message have the word created and something more
          res.body.should.have
            .property("message")
            .eql(`User ${user.email} created`);

          done();
        });
    });
  });
});
