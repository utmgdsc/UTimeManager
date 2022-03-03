const asyncHandler = require("express-async-handler");
const Task = require("../models/userTasks");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const e = require("express");
const { mongo } = require("mongoose");
const { isValidObjectId } = require("mongoose");
const ObjectId = require('mongoose').Types.ObjectId; 

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
  // TESTED
  // console.log("in GetTasks");
  const userId = req.body.user_id;
  console.log(userId);
  const tasks = await Task.find({ user_id: userId });

  // console.log("TASKS:");
  // console.log(tasks);
  res.status(200).json(tasks);
});

const getTasksById = asyncHandler(async (req, res) => {
  // Task id Parameter
  console.log("In getTasksById");
  const id = req.params.id;

  // Users id
  const userId = req.body.user_id;

  const tasks = await Task.find({
    user_id: userId,
  });
  // .findById(req.body.id);
  console.log(tasks);
  console.log(id);
  const userTasks = tasks.filter(function (task) {
    return task._id == id;
  });

  console.log("User Tasks:");
  console.log(userTasks);
  res.status(200).json(userTasks);
});

const getTasksByDay = asyncHandler(async (req, res) => {

  const header = req.headers["authentication"];
  const token = header.split(" ")[1];

  const user_data = jwt.decode(token);

  const userId = user_data._id;


  const date = req.params.day; // get a day -> 26
  console.log("In getTasksByDay");

  // Users id -> Extract from JWT since GET does not take any body
  //  const userId = req.body.user_id;
  console.log("In getTasksByDay");
  let startDate = 0;
  let endDate = 0;
  console.log("user_id:" + userId);
  console.log("Is valid uid", isValidObjectId(userId))

  if (date.length === 8) {
    // parse
    const year = parseInt(date.substring(0, 4));
    const month = parseInt(date.substring(4, 6));
    const day = parseInt(date.substring(6, 8));
    console.log("year:" + year);
    console.log("month:" + month);
    console.log("day:" + day);

    try {
      startDate = new Date(year, month - 1, day);
      console.log(startDate);
      endDate = new Date(year, month - 1, day + 2);
      console.log(endDate);
    } catch (error) {
      console.log(error);
      throw new Error("Invalid Date Input");
    }
  }

  // Check if its a valid date object
  const aaa = new Date(2022, 1, 20);
  const bbb = new Date("2022-02-20T15:02:08");
  console.log("aaa:", aaa);
  console.log("bbb:", bbb);

  const tasks = await Task.find({
    user_id: ObjectId(userId),
    startDate: {
      // $gte: startDate,
      $gte: new Date(startDate),
    },
    endDate: {
      $lte: new Date(endDate),
    },
    isStarted: true,
  });
  console.log(tasks);
  res.status(200).json(tasks);
});

module.exports = { createTask, getTasks, getTasksByDay, getTasksById };
