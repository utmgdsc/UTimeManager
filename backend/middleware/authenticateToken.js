const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const authenticateToken = asyncHandler(async (req, res, next) => {
  // Get the token from the auth header (where it would be stored)
  let token;
  if (
    req.headers.cookie &&
    req.headers.cookie.includes("token")
  ) {
    token = req.headers.cookie.split("token=")[1].split(";")[0];
  }

  // Verify that there is a token
  if (!token) {
    // Bad request
    // Code subject to change
    res.status(401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.id = decoded._id;
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
});

module.exports = { authenticateToken };
