const express = require("express");
const { createTask } = require("../controllers/taskController");

const { authenticateToken } = require("../middleware/authenticateToken");

const router = express.Router();

// @desc Create a new task
// @route POST /api/tasks/
// @acess Private
router.post("/", [authenticateToken, createTask]);

// @desc     Fetch all tasks
// @route    GET /api/tasks/
// @access   Public
router.get("/", [authenticateToken, getTasks]);

// @desc     Fetch single task
// @route    GET /api/products/:id
// @acesss   Public
router.get("/", [authenticateToken, getTasksById]);

module.exports = router;
