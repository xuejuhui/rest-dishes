const express = require("express");
const router = express.Router();

const commentsController = require("../../controllers/comments");

router.get("/:id/comments", commentsController.getAllComments);
//
// router.post();
//
// router.delete();

module.exports = router;
