const mongoose = require("mongoose");
const { connection } = require("./config/db");
const express = require("express");
const { userRouter } = require("./routes/user.route");
const { authorization } = require("./middlerwares/authorization.middleware");
const { noteRouter } = require("./routes/notes.routes");
require("dotenv").config();


const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    res.send("HOME PAGE");
  } catch (error) {
    console.log(error);
    res.send({ msg: error.message });
  }
});

app.use("/users", userRouter);
app.use(authorization);
app.use("/notes", noteRouter);

app.listen(process.env.port, async (req, res) => {
  try {
    await connection;
    console.log("DB is connected");
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Error connecting" });
  }
  console.log("Connected to the port: " + process.env.port);
});
