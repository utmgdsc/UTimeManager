const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
    },
    task_id: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);
const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
