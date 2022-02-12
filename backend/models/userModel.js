const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    // tells mongoose to assign createdAt and updatedAt fields to the user schema
    timestamps: true,
  }
);

// User is a constructor defined from userSchema. This allows us to create documents
const User = mongoose.model("User", userSchema);

module.exports = User;
