const express = require("express");
const { Notesmodel } = require("../models/notes.model");

const noteRouter = express.Router();

noteRouter.get("/", async (req, res) => {
  const userId = req.body.userID;
  try {
    const notes = await Notesmodel.find({ userID: userId });
    res.send(`${notes}`);
  } catch (error) {
    console.log(error);
    res.send({ msg: "Note not find" });
  }
});

noteRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const note = new Notesmodel(payload);
    await note.save();
    res.send("Note created successfully");
  } catch (error) {
    res.send("error creating note");
  }
});

noteRouter.patch("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  const notes = await Notesmodel.findOne({ _id: id });
  const note_userID = notes.userID;
  const prev_userID = req.body.userID;
  try {
    if (note_userID != prev_userID) {
      res.send("You are not authorized to edit this note");
    } else {
      await Notesmodel.findByIdAndUpdate({ _id: id }, payload);
      res.send("notes updated successfully");
    }
  } catch (error) {
    console.log(error);
    res.send({ msg: error.message });
  }
});

noteRouter.put("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  const notes = await Notesmodel.findOne({ _id: id });
  const note_userID = notes.userID;
  const prev_userID = req.body.userID;
  try {
    if (note_userID != prev_userID) {
      res.send("You are not authorized to edit this note");
    } else {
      await Notesmodel.findByIdAndUpdate({ _id: id }, payload);
      res.send("notes updated successfully");
    }
  } catch (error) {
    console.log(error);
    res.send({ msg: error.message });
  }
});
noteRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const notes = await Notesmodel.findOne({ _id: id });
  const note_userID = notes.userID;
  const prev_userID = req.body.userID;
  try {
    if (note_userID != prev_userID) {
      res.send("You are not authorized to edit this note");
    } else {
      await Notesmodel.findByIdAndDelete({ _id: id });
      res.send("notes deleted successfully");
    }
  } catch (error) {
    console.log(error);
    res.send({ msg: error.message });
  }
});

module.exports = {
  noteRouter,
};
