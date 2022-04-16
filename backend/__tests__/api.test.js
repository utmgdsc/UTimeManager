const request = require("supertest");
const { app } = require("../server");
const mongoose = require("mongoose");
const User = require("../models/userModel");
const Task = require("../models/userTasks");
const Feedback = require("../models/feedbackModel");

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
    .send({ email: "nestor@mail.utoronto.ca", password: "abcd" });
  expect(res.statusCode).toEqual(201);
  expect(res.body.email).toEqual("nestor@mail.utoronto.ca");
  userId = res.body._id;
});

describe("Example Test Suite", () => {
  it("Root url sample test", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
  });
});

describe("Login Test Suite", () => {
  it("Valid Login", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({ email: "nestor@mail.utoronto.ca", password: "abcd" });
    expect(res.statusCode).toEqual(200);
    expect(res.headers["set-cookie"][0]).toEqual(
      expect.stringContaining("token")
    );
    jwt = res.headers["set-cookie"][0].split(";")[0];
  });

  it("Invalid Login", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({ email: "nestor@mail.utoronto.ca", password: "" });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toEqual("Wrong password");
  });
});

describe("Getting Tasks Suite", () => {
  let taskObjectId;
  let taskObjectIdNotExist;
  beforeAll(async () => {
    // Create task (Case 1)
    const taskRes = await request(app)
      .post("/api/tasks")
      .set("cookie", jwt)
      .send({
        title: "Test Task",
        user_id: userId,
        description: "Test Task",
        startDate: "2022-04-14T04:00:00.000Z",
        endDate: new Date().toISOString(),
        isStarted: false,
      });
    taskObjectId = taskRes.body._id;

    // Case 2
    const taskRes1 = await request(app)
      .post("/api/tasks")
      .set("cookie", jwt)
      .send({
        title: "Test Task 1",
        user_id: userId,
        description: "Test Task",
        startDate: "2022-04-12T04:00:00.000Z",
        endDate: "2022-04-14T00:00:08",
        isStarted: false,
      });

    // Case 3
    const taskRes2 = await request(app)
      .post("/api/tasks")
      .set("cookie", jwt)
      .send({
        title: "Test Task 2",
        user_id: userId,
        description: "Test Task",
        startDate: "2022-04-01T04:00:00.000Z",
        endDate: "2022-04-18T00:00:08",
        isStarted: false,
      });

    // Case 4
    const taskRes3 = await request(app)
      .post("/api/tasks")
      .set("cookie", jwt)
      .send({
        title: "Test Task 3",
        user_id: userId,
        description: "Test Task",
        startDate: "2022-04-01T04:00:00.000Z",
        endDate: "2022-04-18T00:00:08",
        isStarted: false,
      });
    // Case 4
    const taskRes4 = await request(app)
      .post("/api/tasks")
      .set("cookie", jwt)
      .send({
        title: "Test Task 4",
        user_id: userId,
        description: "Test Task",
        startDate: "2022-04-01T04:00:00.000Z",
        endDate: "2022-04-18T00:00:08",
        isStarted: false,
      });
    taskObjectIdNotExist = taskRes4._body._id;
    await Task.deleteMany({ title: "Test Task 4", user_id: userId });
  });

  it("Getting All Tasks (Valid token)", async () => {
    const res = await request(app).get("/api/tasks").set("cookie", jwt);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([expect.objectContaining({ title: "Test Task" })])
    );
  });

  it("Getting All Tasks (Invalid token)", async () => {
    const res = await request(app).get("/api/tasks").set("cookie", "jwt");
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toEqual("Not authorized, token failed");
  });

  it("Getting Tasks by Date Range (Valid Token)", async () => {
    const res = await request(app)
      .get("/api/tasks?start=20220401&end=20270407")
      .set("cookie", jwt);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([expect.objectContaining({ title: "Test Task" })])
    );
  });

  it("Getting Tasks By Date Range (Invalid token)", async () => {
    const res = await request(app)
      .get("/api/tasks?start=20220401&end=20270407")
      .set("cookie", "jwt");
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toEqual("Not authorized, token failed");
  });

  it("Getting Tasks by id (Valid Token)", async () => {
    const res = await request(app)
      .get(`/api/tasks/task/${taskObjectId}`)
      .set("cookie", jwt);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.objectContaining({ title: "Test Task" }));
  });

  it("Getting Tasks by id (Invalid Token)", async () => {
    const res = await request(app)
      .get(`/api/tasks/task/${taskObjectId}`)
      .set("cookie", "jwt");

    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toEqual("Not authorized, token failed");
  });

  it("Getting Tasks by id (Invalid id)", async () => {
    const res = await request(app)
      .get("/api/tasks/task/abdcd12334")
      .set("cookie", jwt);

    expect(res.statusCode).toEqual(400);
    // expect(res.body.message).toEqual("Not authorized, token failed");
  });

  it("Getting Tasks by id (Id that does not exist)", async () => {
    const res = await request(app)
      .get(`/api/tasks/task/${taskObjectIdNotExist}`)
      .set("cookie", jwt);

    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toEqual("Unable to get a task");
  });

  it("Getting Tasks by Date Range (3 Cases)", async () => {
    const res = await request(app)
      .get("/api/tasks?start=20220413&end=20220415")
      .set("cookie", jwt);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: "Test Task" }),
        expect.objectContaining({ title: "Test Task 1" }),
        expect.objectContaining({ title: "Test Task 2" }),
        expect.not.objectContaining({ title: "Test Task 3" }),
      ])
    );
  });
});

describe("Create Task Suite", () => {
  it("Create Task (Valid Token)", async () => {
    const res = await request(app).post("/api/tasks").set("cookie", jwt).send({
      title: "Test Task",
      user_id: userId,
      description: "Test Task",
      endDate: new Date().toISOString(),
      isStarted: false,
    });
    expect(res.body.title).toEqual("Test Task");
    expect(res.body.user_id).toEqual(userId);
    expect(res.body.description).toEqual("Test Task");
    expect(res.body.isStarted).toEqual(false);
  });

  it("Create Task (False input)", async () => {
    const res = await request(app).post("/api/tasks").set("cookie", jwt).send({
      user_id: userId,
      description: "Test Task",
      endDate: new Date().toISOString(),
      isStarted: false,
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Invalid Create Task Input");
  });

  it("Create Task (Invalid token)", async () => {
    const res = await request(app).post("/api/tasks").set("cookie", "jwt");
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toEqual("Not authorized, token failed");
  });
});

describe("Create Feedback Suite", () => {
  let taskObjectId;
  beforeAll(async () => {
    // Create task
    const taskRes = await request(app)
      .post("/api/tasks")
      .set("cookie", jwt)
      .send({
        title: "Test Task",
        user_id: userId,
        description: "Test Task",
        endDate: new Date().toISOString(),
        isStarted: false,
      });
    taskObjectId = taskRes.body._id;
  });

  it("Create Feedback (Valid Token)", async () => {
    const res = await request(app)
      .post("/api/feedback")
      .set("cookie", jwt)
      .send({
        body: "Feedback from Chris on feedback branch: fix this",
        satisfaction: 9,
        user_id: userId,
        task_id: taskObjectId,
      });
    expect(res.body.body).toEqual(
      "Feedback from Chris on feedback branch: fix this"
    );
    expect(res.body.user_id).toEqual(userId);
    expect(res.body.satisfaction).toEqual(9);
    expect(res.body.body).toEqual(
      "Feedback from Chris on feedback branch: fix this"
    );
  });

  it("Create Task (Invalid token)", async () => {
    const res = await request(app).post("/api/feedback").set("cookie", "jwt");
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toEqual("Not authorized, token failed");
  });

  it("Create Feedback (Valid Token)", async () => {
    const res = await request(app)
      .post("/api/feedback")
      .set("cookie", jwt)
      .send({
        body: "Feedback from Chris on feedback branch: fix this",
        user_id: userId,
        task_id: taskObjectId,
      });
    expect(res.body.message).toEqual("Invalid Feedback Input");
    expect(res.statusCode).toEqual(400);
  });
});

describe("Toggle Task Test Suite", () => {
  let taskObjectId;
  beforeAll(async () => {
    // Create task
    const taskRes = await request(app)
      .post("/api/tasks")
      .set("cookie", jwt)
      .send({
        title: "Test Task",
        user_id: userId,
        description: "Test Task",
        endDate: new Date().toISOString(),
        isStarted: false,
      });
    taskObjectId = taskRes.body._id;
  });

  it("Toggle Task (Not Started Yet)", async () => {
    const toggleTaskRes = await request(app)
      .put(`/api/tasks/toggle/${taskObjectId}`)
      .set("cookie", jwt);
    expect(toggleTaskRes.body.isStarted).toEqual(true);
  });

  it("Toggle Task (Already Started)", async () => {
    const toggleTaskRes = await request(app)
      .put(`/api/tasks/toggle/${taskObjectId}`)
      .set("cookie", jwt);
    expect(toggleTaskRes.body.isStarted).toEqual(false);
  });

  it("Toggle Task (Already Ended)", async () => {
    const toggleTaskRes = await request(app)
      .put(`/api/tasks/toggle/${taskObjectId}`)
      .set("cookie", jwt);
    expect(toggleTaskRes.body.message).toEqual(
      `Couldn't start task. The task has already ended`
    );
    expect(toggleTaskRes.statusCode).toEqual(401);
  });
});

afterAll(async () => {
  const user = await User.findOne({ email: "nestor@mail.utoronto.ca" });
  await User.deleteOne(user);
  await Task.deleteMany({ title: "Test Task", user_id: userId });
  await Feedback.deleteMany({
    body: "Feedback from Chris on feedback branch: fix this",
  });
  mongoose.connection.close();
  server.close();
});
