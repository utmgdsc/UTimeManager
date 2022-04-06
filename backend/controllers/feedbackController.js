const asyncHandler = require("express-async-handler");
const Feedback = require("../models/feedbackModel");

const createFeedback = asyncHandler(async (req, res) => {
  const feedback = await new Feedback(req.body);

  const userId = req.id;
  feedback.user_id = userId;
  feedback.createDate = new Date();

  const createdFeedback = await feedback.save();
  res.status(201).json(createdFeedback);

  if (!createdFeedback) {
    res.status(400);
    throw new Error("Invalid Task Input");
  }
});

module.exports = { createFeedback };
