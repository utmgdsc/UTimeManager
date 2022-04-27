const express = require("express");
const { registerUser, loginUser, logoutUser } = require("../controllers/userController");
const router = express.Router();
const {authenticateToken} = require("../middleware/authenticateToken");

const loginRouter = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.post("/logout", [authenticateToken, logoutUser])

module.exports = router;
