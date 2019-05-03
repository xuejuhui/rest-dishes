process.env.NODE_ENV = "test";
// let User = require("../models/User.js");
const mongoose = require("mongoose");

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../bin/www");
let should = chai.should();
let expect = chai.expect;
chai.use(chaiHttp);

// mongoose.models = {};
// mongoose.modelSchemas = {};
// let login_details = {
//   email: "email@email.com",
//   password: "123@abc"
// };
//
// let register_details = {
//   email: "email@email.com",
//   password: "123@abc"
// };
//
describe("Create Account, Login and Check Token", () => {
  beforeEach(done => {
    // Reset user mode before each test
    var db = mongoose.createConnection();
    done();
  });

  afterEach(function(done) {
    server.close();
    done();
  });

  let login_details = {
    email: "ray@ray.com",
    password: "123"
  };
  let token;
  describe("/POST Login", () => {
    it("it should Register, Login, and check token", done => {
      chai
        .request(server)
        .post("/api/users/login")
        .send(login_details) // this is like sending $http.post or this.http.post in Angular
        .end((err, res) => {
          // when we get a response from the endpoint
          // in other words,
          // the res object should have a status of 201
          res.should.have.status(200);
          // the property, res.body.state, we expect it to be true.

          expect(res.body).to.exist;
          res.body.should.have.property("token");
          token = res.body.token;
          done();
        });
    });
    it("Check Api-endpoint without token", done => {
      chai
        .request(server)
        .get("/api/dishes/alldishes")
        // .send(login_details) // this is like sending $http.post or this.http.post in Angular
        .end((err, res) => {
          // when we get a response from the endpoint
          // in other words,
          // the res object should have a status of 201
          res.should.have.status(401);
          // the property, res.body.state, we expect it to be true.
          done();
        });
    });
    it("Check Api-endpoint with token", done => {
      chai
        .request(server)
        .get("/api/dishes/alldishes")
        .set("Authorization", `${token}`)
        // .send(login_details) // this is like sending $http.post or this.http.post in Angular
        .end((err, res) => {
          // when we get a response from the endpoint
          // in other words,
          // the res object should have a status of 201
          res.should.have.status(200);
          // the property, res.body.state, we expect it to be true.
          expect(res.body).to.be.instanceOf(Array);
          expect(res.body).to.exist;
          done();
        });
    });
  });
});
