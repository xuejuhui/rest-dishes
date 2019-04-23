const express = require("express");
const router = express.Router();

const commentsController = require("../../controllers/comments");

router.get("/:id/comments", commentsController.getAllComments);
//
router.post("/comments", commentsController.postComment);
//
// router.delete();

module.exports = router;
