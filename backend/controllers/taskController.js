const asyncHandler = require("express-async-handler");
const Task = require("../models/userTasks");

const createTask = asyncHandler(async (req, res) => {
  const task = await new Task(req.body);
  const userId = req.id;
  task.user_id = userId;

  const createdTask = await task
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400);
        throw new Error("Invalid Feedback Input");
      }
      res.status(500);
      throw new Error("Unable to create feedback");
    });
});

const getTasks = asyncHandler(async (req, res) => {
  const startDateParam = req.query.start;
  const endDateParam = req.query.end;
  const userId = req.id;

  let startDate = 0;
  let endDate = 0;

  if (startDateParam && endDateParam) {
    if (startDateParam.length === 8 && endDateParam.length === 8) {
      // parse
      const year = parseInt(startDateParam.substring(0, 4));
      const month = parseInt(startDateParam.substring(4, 6));
      const day = parseInt(startDateParam.substring(6, 8));

      const year_end = parseInt(endDateParam.substring(0, 4));
      const month_end = parseInt(endDateParam.substring(4, 6));
      const day_end = parseInt(endDateParam.substring(6, 8));

      try {
        startDate = new Date(year, month - 1, day);
        endDate = new Date(year_end, month_end - 1, day_end + 1);
      } catch (error) {
        throw new Error("Invalid Date Input");
      }
      const tasks = await Task.find({
        $or: [
          {
            user_id: userId,
            startDate: {
              $lte: startDate,
            },
            endDate: {
              $gte: startDate,
            },
          },
          {
            user_id: userId,
            startDate: {
              $lte: startDate,
            },
            endDate: {
              $gte: startDate,
              $lte: endDate,
            },
          },
          {
            user_id: userId,
            startDate: {
              $gte: startDate,
              $lt: endDate,
            },
            endDate: {
              $gt: startDate,
            },
          },
        ],
      })
        .then((docs) => {
          res.status(200).json(docs);
        })
        .catch((err) => {
          res.status(500);
          throw new Error(`Could not fetch doc ${err}`);
        });
      res.status(200).json(tasks);
    } else {
      throw new Error("Invalid Date Input");
    }
  } else if (!startDateParam && !endDateParam) {
    await Task.find({ user_id: userId })
      .then((docs) => {
        res.status(200).json(docs);
      })
      .catch((err) => {
        res.status(500);
        throw new Error(`Could not fetch doc ${err}`);
      });
  } else {
    throw new Error("Invalid Date Input");
  }
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

const toggleTask = asyncHandler(async (req, res) => {
  const taskId = req.params.id;
  const userId = req.id;
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
    throw new Error("Task not found");
  }

  if (task.isStarted) {
    // stop the task
    task.isStarted = false;
    task.taskEndedAt = taskDate;
    const updatedTask = await task.save();
    res.json(updatedTask);
  } else if (!task.isStarted && task.taskEndedAt === undefined) {
    // start the task
    task.isStarted = true;
    task.taskStartedAt = taskDate;
    const updatedTask = await task.save();
    res.json(updatedTask);
  } else {
    res.status(401);
    throw new Error("Couldn't start task. The task has already ended");
  }
});

module.exports = {
  createTask,
  getTasks,
  getTasksById,
  toggleTask,
};
