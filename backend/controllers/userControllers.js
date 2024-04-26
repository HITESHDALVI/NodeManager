const { UserModel } = require("../models/userModels");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginController = async (req, res) => {
  try {
    const { email, password } = req?.query;

    let option = { expiresIn: "24h" };

    let data = await UserModel.find({ email });
    if (data.length === 0) {
      return res
        .status(404)
        .json({ message: "Invalid credentials!", status: 404 });
    }

    let correctPassword = await bcrypt.compare(password, data[0].password);

    if (correctPassword) {
      let token = jwt.sign(
        data[0]._id.toJSON(),
        process.env.JWT_SECRET_KEY
        //   option
      );
      data.token = token;
      // await data.save();
      return res.send({
        message: "Login successfully.",
        status: 200,
        token,
      });
    } else {
      return res.send({
        message: "Invalid credentials!",
        status: 404,
      });
    }
    // });
    // await data.save();
  } catch (err) {
    console.log({ err });
    return res.send({
      message: "Something went wrong,please try again.",
      status: 500,
    });
  }
};

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req?.body?.body;
    let data = await UserModel.find({ email });

    if (data.length > 0) {
      return res
        .status(403)
        .json({ message: "Email ID already exist", status: 403 });
    }
    bcrypt.hash(password, 5, async function (err, hash) {
      if (err) {
        return res.send({
          message: "Something went wrong!",
          status: 500,
        });
      }

      try {
        let user = new UserModel({ name, email, password: hash });
        await user.save();
        return res.send({
          message: "User registered successfully",
          status: 201,
        });
      } catch (error) {
        return res.send({
          message: "Something went wrong,please try again.",
          status: 500,
        });
      }
    });
  } catch (err) {
    return res.send({
      message: "Something went wrong,please try again.",
      status: 500,
    });
  }
};

module.exports = {
  loginController,
  registerController,
};
