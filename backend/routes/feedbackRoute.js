const express = require("express");

const {
  createFeedback,
  getFeedback,
} = require("../controllers/feedbackController");
const { authenticateToken } = require("../middleware/authenticateToken");

const router = express.Router();

// @desc Get feedback for a task
// @route GET /api/feedback/tasks/:taskId
// @access Private
router.get("/tasks/:taskId", [authenticateToken, getFeedback]);

// @desc Create new feedback
// @route POST /api/tasks/feedback
// @access Private
router.post("/", [authenticateToken, createFeedback]);

module.exports = router;
