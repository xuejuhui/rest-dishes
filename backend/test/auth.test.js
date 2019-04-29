process.env.NODE_ENV = "test";
let User = require("../models/User.js");
const mongoose = require("mongoose");

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();
let expect = chai.expect;
chai.use(chaiHttp);

let login_details = {
  email: "email@email.com",
  password: "123@abc"
};

let register_details = {
  email: "email@email.com",
  password: "123@abc"
};

describe("Create Account, Login and Check Token", () => {
  beforeEach(done => {
    // Reset user mode before each test
    User.remove({}, err => {
      console.log(err);
      done();
    });
  });

  afterEach(function(done) {
    server.close();
    done();
  });

  describe("/POST Register", () => {
    it("it should Register, Login, and check token", done => {
      chai
        .request(server)
        .post("/api/users/register")
        .send(register_details) // this is like sending $http.post or this.http.post in Angular
        .end((err, res) => {
          // when we get a response from the endpoint
          // in other words,
          // the res object should have a status of 201
          res.should.have.status(200);
          // the property, res.body.state, we expect it to be true.

          expect(res.body).to.exist;
          done();

          // follow up with login
          chai
            .request(server)
            .post("/api/users/login")
            .send(login_details)
            .end((err, res) => {
              console.log("this was run the login part");
              res.should.have.status(200);
              expect(res.body).to.exist;
              res.body.should.have.property("token");
              done();
              //
              //     let token = res.body.token;
              //     // follow up with requesting user protected page
              //     chai.request(server)
              //       .get('/api/v1/account/user')
              //       // we set the auth header with our token
              //       .set('Authorization', token)
              //       .end((err, res) => {
              //         res.should.have.status(200);
              //         expect(res.body.state).to.be.true;
              //         res.body.data.should.be.an('object');
              //
              //         done(); // Don't forget the done callback to indicate we're done!
              //       })
              //   })
            });
        });
    });
  });
});
