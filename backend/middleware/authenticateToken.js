const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  // Get the token from the auth header (where it would be stored)
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    const authHeader = req.headers.authorization;
    token = authHeader.split(" ")[1];
  }

  // Verify that there is a token
  if (!token) {
    // Bad request
    // Code subject to change
    res.status(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, id) => {
    if (err) {
      // Status subject to change
      res.status(403);
    }

    req.id = id;

    next();
  });
};

module.exports = { authenticateToken };
