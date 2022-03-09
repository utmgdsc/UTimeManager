const request = require("supertest");
const {app, server} = require("../server")
const mongoose = require("mongoose");

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        // useCreateIndex: true,
    });
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

afterAll(done => {
    mongoose.connection.close();
    server.close();
    done();
})
