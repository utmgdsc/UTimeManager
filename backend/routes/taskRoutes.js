const express = require("express");
const {createTask} = require("../controllers/taskController");

const {authenticateToken} = require("../middleware/authenticateToken");

const router = express.Router();

// @desc Create a new task
// @route POST /api/tasks/
// @acess Private
router.post("/", [authenticateToken, createTask]);

module.exports = router;