// const jwt = require('jsonwebtoken')

// /* Where:
//     user: unique user object that can be turned into a string
//     duration: String, time in milliseconds
// */
// const generate_token = (user, duration) => {
//     return jwt.sign(user, process.env.JWT_SECRET, duration)
// }

// module.exports = generate_token;

const jwt = require("jsonwebtoken");
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
