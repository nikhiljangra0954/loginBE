const express = require("express");
const { Usermodel } = require("../models/users.model");
require("dotenv").config();
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

userRouter.post("/register", async (req, res) => {
  const { name, email, password, age } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, secure_pass) => {
      if (err) {
        console.log(err);
      } else {
        const user = new Usermodel({ name, email, password: secure_pass, age });
        await user.save();
        console.log(user);
        res.send(`${user.name} registered successfully`);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Usermodel.findOne({ email });
    const hashpass = user.password;
    bcrypt.compare(password, hashpass, (err, result) => {
      if (result) {
        const token = jwt.sign({ userID: user._id }, process.env.key);
        res.send({ msg: `${user.name} login successful`, token: token });
      } else {
        console.log("login failed");
        res.send({ msg: `login failed` });
      }
    });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

module.exports = {
  userRouter,
};
