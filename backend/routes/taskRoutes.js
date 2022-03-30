const express = require("express");
const {
  createTask,
  getTasks,
  getTasksById,
  getTasksByDay,
  getTasksByMonth,
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

// @desc    Fetch task by month
// @route   GET /api/tasks/month/:month
// @access  Private
router.get("/month/:month", [authenticateToken, getTasksByMonth]);

// @desc     Fetch task with day query
// @route    GET /api/tasks/day/:day
// @access   Private
router.get("/day/:day", [authenticateToken, getTasksByDay]);

// @desc     Fetch single task
// @route    GET /api/tasks/:id
// @acesss   Private
router.get("/task/:id", [authenticateToken, getTasksById]);
// CHANGE: /task/:id
// To avoid clashes with other routes

module.exports = router;
