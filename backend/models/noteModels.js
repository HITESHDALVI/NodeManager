const mongoose = require("mongoose");
const { UserModel } = require("./userModels");

const noteSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  owner: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
});

const NoteModel = mongoose.model("note", noteSchema);

module.exports = { NoteModel };
