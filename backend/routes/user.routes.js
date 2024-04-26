const express = require("express");
const {
  loginController,
  registerController,
} = require("../controllers/userControllers");

const userRouter = express.Router();

userRouter
  .get("/", async (req, res) => {
    res.send({
      message: "user router works!",
    });
  })
  .post("/register", registerController)
  .get("/login", loginController);

module.exports = { userRouter };
