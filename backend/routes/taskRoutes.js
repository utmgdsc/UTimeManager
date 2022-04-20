const express = require("express");
const {
  createTask,
  getTasks,
  getTasksById,
  toggleTask,
  editTaskById,
  deleteTaskById
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
router.get("/:id", [authenticateToken, getTasksById]);

// @desc     Edit single task
// @route    PUT /api/tasks/:id
// @acesss   Private
router.put("/:id", [authenticateToken, editTaskById]);

// @desc     Delete single task
// @route    DELETE /api/tasks/:id
// @acesss   Private
router.delete("/:id", [authenticateToken, deleteTaskById]);

// @desc     Update isStarted state to true
// @route    PUT /api/tasks/startTask/:id
// @access   Private
router.put("/toggle/:id", [authenticateToken, toggleTask]);

module.exports = router;
