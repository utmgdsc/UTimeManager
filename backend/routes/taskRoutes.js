const express = require("express");
const {
  createTask,
  getTasks,
  getTasksById,
  getTasksByDay,
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
// @route    GET /api/tasks/task/:id
// @acesss   Private
router.get("/task/:id", [authenticateToken, getTasksById]);

// @desc     Fetch task with day query
// @route    GET /api/tasks/day/:day
router.get("/day/:day", [authenticateToken, getTasksByDay]);

module.exports = router;
