const expect = require("chai").expect;
const { register } = require("../controllers/auth.js");

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../bin/www");
let should = chai.should();
chai.use(chaiHttp);

let req = {
  body: {}
};
let res = {
  sendCalledWith: "",
  json: function(arg) {
    console.log(arg);
    this.sendCalledWith = arg;
  }
};
let next = function(err) {
  console.log("lala");
};
describe("register", () => {
  it("Should error out if no name provided ", function() {
    let newReq = req;
    newReq.body.email = "we@sd.com";
    newReq.body.password = "283728";
    register(req, res, next);
    expect(res.sendCalledWith).to.contain("error");
  });
});
