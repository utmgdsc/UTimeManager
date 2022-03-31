const express = require("express");
const {
  createTask,
  getTasks,
  getTasksById,
  getTasksByDay,
  toggleTask
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
// @access   Private
router.get("/day/:day", [authenticateToken, getTasksByDay]);


// @desc     Update isStarted state to true
// @route    PUT /api/tasks/startTask/:id
// @access   Private
router.put("/startTask/:id", [authenticateToken, toggleTask]);

// @desc     Update isStarted state to false
// @route    PUT /api/tasks/stopTask/:id
// @access   Private
// router.put("/stopTask/:id", [authenticateToken, stopTask]);

module.exports = router;
