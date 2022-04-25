const express = require("express");

const {
  createFeedback,
  getFeedback,
} = require("../controllers/feedbackController");
const { authenticateToken } = require("../middleware/authenticateToken");

const router = express.Router();

router.get("/tasks/:taskId", [authenticateToken, getFeedback]);

// @desc Create new feedback
// @route POST /api/tasks/feedback
// @acess Private
router.post("/", [authenticateToken, createFeedback]);

module.exports = router;
