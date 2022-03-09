const express = require("express");
const userRoutes = require("./routes/userRoutes");
const {notFound, errorHandler} = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
const cors = require("cors");

const app = express();
require("dotenv").config();

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
        methods: "GET,POST,DELETE"
    })
)
app.use(express.json()); // Allows us to accept JSON data in the body

var router = express.Router();

app.get("/", (req, res) => {
    res.send("API is running...");
    console.log("HELLO");
});

app.use("/api/users", userRoutes);
app.use("/api/task", taskRoutes);
// app.use("/login", login);

app.use(notFound);
app.use(errorHandler);

let server;
if (process.env.NODE_ENV !== "development") {
    server = app.listen();
} else {
    connectDB();
    server = app.listen(5000, console.log("Server running on port 5000"));
}


module.exports = {app, server}
