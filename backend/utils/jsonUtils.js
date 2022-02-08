const jwt = require('jsonwebtoken')

/* Where:
    user: unique user object that can be turned into a string
    duration: String, time in milliseconds
*/
const generate_token = (user, duration) => {
    return jwt.sign(user, process.env.JWT_SECRET, duration)
}

module.exports.f = f;