const asyncHandler = require("express-async-handler");
const Task = require("../models/userTasks");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createTask = asyncHandler(async (req, res) => {
  // TODO:
  const task = await new Task(req.body);
  const createdTask = await task.save();
  res.status(201).json(createdTask);

  if (!createdTask) {
    res.status(400);
    throw new Error("Invalid Task Input");
  }
});

const getTasks = asyncHandler(async (req, res) => {
  const userId = req.body.user_id; 

  const tasks = await new Task.find({ user_id: userId });

  console.log(tasks);
  res.status(200).json(tasks);
});

const getTasksById = asyncHandler(async (req, res) => {
  // Task id Parameter
  const id = req.params.id; 

  // Users id
  const userId = req.body.user_id;

  const tasks = new Task.find({
    user_id: userId
  }).findById(req.body.id);

  console.log(tasks);
  res.status(200).json(tasks)
  
})


const getTasksByDay = asyncHandler(async (req, res) => {
  // TODO: ?
  // const date = req.params.day; 

  // Users id
  const userId = req.body.user_id;
  const startTime = req.body.startTime;
  const endTime = req.body.endtime;


  const tasks = new Task.find({
    user_id: userId,
    startDate: { $gte: startTime ,$lte: endTime}
  })

  console.log(tasks);
  res.status(200).json(tasks);
  

})





module.exports = { createTask, getTasks, getTasksByDay, getTasksById };
