const request = require("supertest");
const {app} = require("../server")
const mongoose = require("mongoose");
const User = require("../models/userModel");
const Task = require("../models/userTasks");

let server;
let userId;
let jwt;

beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/", {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        // useCreateIndex: true,
    });
    server = app.listen();

    // Creating user that we're testing on
    const res = await request(app)
        .post("/api/users")
        .send({email: "nestor@mail.utoronto.ca", password: "abcd"})
    expect(res.statusCode).toEqual(201);
    expect(res.body.email).toEqual("nestor@mail.utoronto.ca");
    userId = res.body._id;
});

describe("Example Test Suite", () => {
    it("Root url sample test", async () => {
        const res = await request(app).get("/")
        expect(res.statusCode).toEqual(200);
    })
})

describe("Login Test Suite", () => {
    it("Valid Login", async () => {
        const res = await request(app)
            .post("/api/users/login")
            .send({email: "nestor@mail.utoronto.ca", password: "abcd"})
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty("token")
        jwt = res.body.token;

    })

    it("Invalid Login", async () => {
        const res = await request(app)
            .post("/api/users/login")
            .send({email: "nestor@mail.utoronto.ca", password: ""})
        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toEqual("Wrong password")
    })
})

describe("Toggle Task Test Suite", () => {
    let taskObjectId;
    beforeAll(async () => {
        // Create task
        const taskRes = await request(app).post("/api/tasks").set("Authorization", `Bearer ${jwt}`).send({
            title: "Test Task",
            "user_id": userId,
            description: "Test Task",
            endDate: new Date().toISOString(),
            isStarted: false
        })
        taskObjectId = taskRes.body._id
    });

    it("Toggle Task (Not Started Yet)", async () => {
        const toggleTaskRes = await request(app).put(`/api/tasks/toggle/${taskObjectId}`).set("Authorization", `Bearer ${jwt}`)
        expect(toggleTaskRes.body.isStarted).toEqual(true);
    })

    it("Toggle Task (Already Started)", async () => {
        const toggleTaskRes = await request(app).put(`/api/tasks/toggle/${taskObjectId}`).set("Authorization", `Bearer ${jwt}`)
        expect(toggleTaskRes.body.isStarted).toEqual(false);
    })

    it("Toggle Task (Already Ended)", async () => {
        const toggleTaskRes = await request(app).put(`/api/tasks/toggle/${taskObjectId}`).set("Authorization", `Bearer ${jwt}`)
        expect(toggleTaskRes.body.message).toEqual(`Couldn't start task. The task has already ended`);
        expect(toggleTaskRes.statusCode).toEqual(401);
    })
})

afterAll(async () => {
    const user = await User.findOne({email: "nestor@mail.utoronto.ca"});
    await User.deleteOne(user)
    await Task.deleteMany({title: "Test Task", "user_id": userId})
    mongoose.connection.close();
    server.close();
})
