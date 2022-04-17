const express = require("express");
const {
  createTask,
  getTasks,
  getTasksById,
  toggleTask,
} = require("../controllers/taskController");

const { authenticateToken } = require("../middleware/authenticateToken");

const router = express.Router();

// @desc Create a new task
// @route POST /api/tasks/
// @acess Private
router.post("/", [authenticateToken, createTask]);

// @desc     Fetch all tasks
// @route    GET /api/tasks/
// @access   Private
router.get("/", [authenticateToken, getTasks]);

// @desc     Fetch single task
// @route    GET /api/tasks/:id
// @acesss   Private
router.get("/task/:id", [authenticateToken, getTasksById]);

// @desc     Update isStarted state to true
// @route    PUT /api/tasks/startTask/:id
// @access   Private
router.put("/toggle/:id", [authenticateToken, toggleTask]);

module.exports = router;
