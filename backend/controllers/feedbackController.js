const asyncHandler = require("express-async-handler");
const Feedback = require("../models/feedbackModel");

const createFeedback = asyncHandler(async (req, res) => {
  const feedback = await new Feedback(req.body);
  const userId = req.id;
  feedback.user_id = userId;

  const createdFeedback = await feedback
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

module.exports = { createFeedback };
