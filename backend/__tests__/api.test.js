const request = require("supertest");
const {app} = require("../server")
const mongoose = require("mongoose");
const User = require("../models/userModel");

let server;
beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/", {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        // useCreateIndex: true,
    });
    server = app.listen();
});

describe("Example Test Suite", () => {
    it("Root url sample test", async () => {
        const res = await request(app).get("/")
        expect(res.statusCode).toEqual(200);
    })
})

describe("Login Test Suite", () => {
    it("Create User", async () => {
        const res = await request(app)
            .post("/api/users")
            .send({email: "nestor@mail.utoronto.ca", password: "abcd"})
        expect(res.statusCode).toEqual(201);
        expect(res.body.email).toEqual("nestor@mail.utoronto.ca");
    })

    it("Valid Login", async () => {
        const res = await request(app)
            .post("/api/users/login")
            .send({email: "nestor@mail.utoronto.ca", password: "abcd"})
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty("token")
    })

    it("Invalid Login", async () => {
        const res = await request(app)
            .post("/api/users/login")
            .send({email: "nestor@mail.utoronto.ca", password: ""})
        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toEqual("Wrong password")
    })
    afterAll(async () => {
        const user = await User.findOne({email: "nestor@mail.utoronto.ca"});
        await User.deleteOne(user)
    })


})

afterAll(done => {
    mongoose.connection.close();
    server.close();
    done();
})
