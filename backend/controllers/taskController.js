const asyncHandler = require("express-async-handler");
const Task = require("../models/userTasks");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const e = require("express");
const { mongo } = require("mongoose");
const { isValidObjectId } = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;

const createTask = asyncHandler(async (req, res) => {
  const task = await new Task(req.body);
  const createdTask = await task.save();
  res.status(201).json(createdTask);

  if (!createdTask) {
    res.status(400);
    throw new Error("Invalid Task Input");
  }
});

const getTasks = asyncHandler(async (req, res) => {
  const userId = req.id;
  await Task.find({ user_id: userId })
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500);
      throw new Error(`Could not fetch doc ${err}`);
    });
});

const getTasksById = asyncHandler(async (req, res) => {
  const taskId = req.params.id;
  const userId = req.id;

  const tasks = await Task.find({
    _id: taskId,
    user_id: userId,
  })
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500);
      throw new Error(`Could not fetch doc ${err}`);
    });
  res.status(200).json(tasks);
});

const getTasksByDay = asyncHandler(async (req, res) => {
  const date = req.params.day;
  const userId = req.id;

  let startDate = 0;

  if (date.length === 8) {
    // parse
    const year = parseInt(date.substring(0, 4));
    const month = parseInt(date.substring(4, 6));
    const day = parseInt(date.substring(6, 8));

    try {
      startDate = new Date(year, month - 1, day);
      endDate = new Date(year, month - 1, day + 2);
    } catch (error) {
      throw new Error("Invalid Date Input");
    }
  }

  // Check if its a valid date object
  const tasks = await Task.find({
    user_id: userId,
    startDate: {
      $lte: startDate,
    },
    endDate: {
      $gte: startDate,
    }
  })
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500);
      throw new Error(`Could not fetch doc ${err}`);
    });
  res.status(200).json(tasks);
});

const getTasksByMonth = asyncHandler(async (req, res) => {
  const userId = req.id;

  // Access the provided 'start' and 'end' query parameters
  let start = req.params.month;
  let startDate = 0;
  let endDate = 0;

  if (start.length === 6) {
    // parse
    const year_s = parseInt(start.substring(0, 4));
    const month_s = parseInt(start.substring(4, 6));

    try {
      startDate = new Date(year_s, month_s - 1, 1);
      endDate = new Date(year_s, month_s, 1);
    } catch (error) {
      throw new Error("Invalid Date Input");
    }
  }

  // Check if its a valid date object
  const tasks = await Task.find({
    user_id: userId,
    startDate: {
      $gte: startDate,
      $lte: endDate,
    }
  })
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500);
      throw new Error(`Could not fetch doc ${err}`);
    });
  res.status(200).json(tasks);
});

const toggleTask = asyncHandler(async (req, res) => {
    const header = req.headers.authorization;
    const token = header.split(" ")[1];

    const user_data = jwt.decode(token);

    const taskId = req.params.id;

    const userId = user_data._id;
    const taskDate = new Date();

    const task = await Task.findOne({
        _id: taskId,
        user_id: userId,
    })

        .then((docs) => {
            return docs;
        })
        .catch(() => {
            res.status(500);
            throw new Error(`Could not fetch doc ${docs}`);
        });

    if (!task) {
        res.status(404);
        throw new Error("Task not found")
    }

    if (task.isStarted) {
        // stop the task
        task.isStarted = false;
        task.taskEndedAt = taskDate;
        const updatedTask = await task.save();
        res.json(updatedTask);
    } else if (!task.isStarted && (task.taskEndedAt === undefined)) {
        // start the task
        task.isStarted = true;
        task.taskStartedAt = taskDate;
        const updatedTask = await task.save();
        res.json(updatedTask);
    } else {
        res.status(401);
        throw new Error("Couldn't start task. The task has already ended")
    }
});

module.exports = {
  createTask,
  getTasks,
  getTasksByDay,
  getTasksById,
  getTasksByMonth,
};
