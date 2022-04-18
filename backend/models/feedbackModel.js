const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    task_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    satisfaction: {
      type: Number,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);
const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
