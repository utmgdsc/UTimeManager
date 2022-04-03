const asyncHandler = require("express-async-handler");
const Feedback = require("../models/feedbackModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const e = require("express");
const { mongo } = require("mongoose");
const { isValidObjectId } = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;


const createFeedback = asyncHandler(async (req, res) => {
  const feedback = await new Feedback(req.body);
  const createdFeedback = await feedback.save();
  res.status(201).json(createdFeedback);

  if (!createdFeedback) {
    res.status(400);
    throw new Error("Invalid Task Input");
  }
});


module.exports = { createFeedback };
