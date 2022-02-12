const asyncHandler = require("express-async-handler");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

const User = require("../models/userModel");

const loginRouter = express.Router();

loginRouter.get('/', (req, res) => {
    res.send("Login page")
});

loginRouter.post('/register', (req, res) => {
    // TODO: Register Users
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        const savedUser = await new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPass
        })

        const result = await savedUser.save();
        res.status(200).json(result);
    } catch(error) {
        res.status(500).json(error)
    }

})

loginRouter.post('/authenticate_user', asyncHandler(async (req, res) => {
    // TODO: Authenticate Users
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user) {
            res.status(400);
            throw new Error("No user found");
        }

        const validate = await bcrypt.compare(req.body.password, user.password);
        if(!validate) {
            res.status(400);
            throw new Error("Wrong password");
        }

        const {password, ...others} = user._doc;

        //TODO: Return a cookie? How do you return a cookie?
        //NOTE: If this is bad it's pretty easy to change lol
        res.status(200).json({token: jwt.sign({email: user.email, name: user.name, _id: user._id, }, process.env.JSON_SECRET, {
                expiresIn: "12000s"
            }
        )});
    } catch(error) {
        res.status(500)
        throw new Error(error)
    }

}))

module.exports = loginRouter
