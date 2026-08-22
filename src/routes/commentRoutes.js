const express = require("express");
const {
    createComment,
    getComments,
    updateComment
} = require("../controllers/commentController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();
router.get("/:postId/comments", getComments);
router.post("/:postId/comments", protect, createComment);
router.put("/:commentId", protect, updateComment);

module.exports = router;