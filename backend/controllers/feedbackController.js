const asyncHandler = require("express-async-handler");
const Feedback = require("../models/feedbackModel");

const createFeedback = asyncHandler(async (req, res) => {
  const feedback = await new Feedback(req.body);
  const userId = req.id;
  feedback.user_id = userId;

  await feedback
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

const getFeedback = asyncHandler(async (req, res) => {
  const taskId = req.params.taskId;
  const userId = req.id;

  await Feedback.findOne({
    user_id: userId,
    task_id: taskId,
  })
    .then((docs) => {
      if (docs === null) {
        res.status(404);
        res.send({ message: "Unable to get feedback" });
        return;
      }
      res.status(200).json(docs);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400);
        throw new Error("Invalid task id provided");
      }
      res.status(500);
      throw new Error("Unable to get feedback");
    });
});

module.exports = { createFeedback, getFeedback };
