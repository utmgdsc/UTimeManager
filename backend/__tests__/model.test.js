const mongoose = require("mongoose");
const User = require("../models/userModel");
const dotenv = require("dotenv");
dotenv.config({path: __dirname + '/../.env'});

beforeAll(async () => {
    // TODO: Change this to another database that isn't the main one
    await mongoose.connect(process.env.MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        // useCreateIndex: true,
    });
});

describe("Test User Model", () => {
    it("Creating a unique user", async () => {
        const newUser = new User({
            email: "testUser@test.com",
            password: "password"
        })
        await User.create(newUser)
        const user = await User.findOne({email: "testUser@test.com"});
        expect(user.email).toEqual(newUser.email);
        await User.deleteOne(user)
    })

    it("Creating duplicate users", async () => {
        const expectedError = `E11000 duplicate key error collection: test.users index: email_1 dup key: { email: \"testUser@test.com\" }`
        await User.create({
            email: "testUser@test.com",
            password: "password"
        })
        await expect(User.create({
            email: "testUser@test.com",
            password: "password"
        })).rejects.toThrow(expectedError)
        const user = await User.findOne({email: "testUser@test.com"});
        await User.deleteOne(user)
    })

})

afterAll(done => {
    mongoose.connection.close();
    done();
})
