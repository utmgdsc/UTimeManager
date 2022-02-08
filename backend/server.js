const express = require("express");
const login = require("./routes/loginRoute");

const app = express();
require("dotenv").config();

var router = express.Router();

app.get("/", (req, res) => {
  res.send("API is running...");
  console.log("HELLO");
});

app.use('/login', login);

app.listen(5000, console.log("Server running on port 5000"));
