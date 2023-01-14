const mongoose = require("mongoose");

const notesSchema = mongoose.Schema(
  {
    title: String,
    notes: String,
    userID: String,
  },
  {
    versionKey: false,
  }
);

const Notesmodel = mongoose.model("note", notesSchema);

module.exports = {
  Notesmodel,
};
