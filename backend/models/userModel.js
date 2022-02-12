const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


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

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Before we perform the command save, the async function will run
userSchema.pre("save", async function (next) {
  // This function will automatically run pre save

  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); // hasing the provided password
});

// User is a constructor defined from userSchema. This allows us to create documents
const User = mongoose.model("User", userSchema);

module.exports = User;
