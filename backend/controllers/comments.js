const boom = require("boom");

const db = require("../models/index");
const validation = require("../utils/joiSchemas/index");

const getAllComments = async (req, res) => {
  console.log(req.params);
  res.json({ hi: "hi" });
};

module.exports = { getAllComments };
