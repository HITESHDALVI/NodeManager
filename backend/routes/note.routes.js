const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { NoteModel } = require("../models/noteModels");
const { UserModel } = require("../models/userModels");
const mongoose = require("mongoose");
const noteRouter = express.Router();

const verifyToken = async (req, res, next) => {
  try {
    const { id } = req.body;
    let data = await UserModel.findOne({ _id: id });
    console.log({ data });
    const bearerHeader = req.headers["authorization"];

    if (bearerHeader) {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token = bearerToken;
      next();
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  } catch (err) {
    console.log({ err });
  }
};

noteRouter
  .get("/", (req, res) => {
    res.send({
      message: "note router works!",
    });
  })
  .post("/create-note", verifyToken, async (req, res) => {
    try {
      const { title, content, category, owner } = req.body;
      const createdAt = new Date().toLocaleString();
      if (!title || !content || !category || !owner) {
        return res.send({
          message: `Field is required.`,
          status: 400,
        });
      }
      let note = new NoteModel({
        title,
        content,
        category,
        owner,
        createdAt,
        updatedAt: createdAt,
      });
      await note.save();
      return res.send({
        message: "Note Created successfully",
        status: 201,
      });
    } catch (error) {}
  })
  .get("/get-notes", async (req, res) => {
    try {
      let data = await NoteModel.find();
      if (data.length < 1) {
        return res.send({
          message: `No data found.`,
          status: 400,
          data: [],
        });
      }
      return res.send({
        message: "Notes fetched successfully",
        status: 200,
        data,
      });
    } catch (error) {
      return res.send({
        message: `Something went wrong.`,
        status: 500,
      });
    }
  })
  .patch("/update-note", async (req, res) => {
    try {
      const { title, content, category, owner, id } = req.body;
      const updatedAt = new Date().toLocaleString();
      console.log({ title, content, category, owner, id });
      let note = await NoteModel.findOne({ _id: id });
      console.log({ note });
      if (!note) {
        return res.send({
          message: `Data not found.`,
          status: 404,
        });
      }
      note.updateOne(
        {
          _id: id,
        },
        { $set: { title, content, category, owner, updatedAt } }
      );
      await note.save();
      return res.send({
        message: "Note updated successfully",
        status: 200,
        note,
      });
    } catch (error) {}
  })
  .delete("/delete-note", async (req, res) => {
    try {
      const { title } = req.body;
      let note = await NoteModel.findOne({ title });
      console.log({ note });
      if (!note) {
        return res.send({
          message: `Data not found.`,
          status: 404,
        });
      }
      note.deleteOne({
        title,
      });
      await note.save();
      return res.send({
        message: "Note deleted successfully",
        status: 200,
        note,
      });
    } catch (error) {}
  });
module.exports = { noteRouter };
