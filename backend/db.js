const mongoose = require("mongoose");
require("dotenv").config();

const connection = mongoose
  .connect(process.env.MONGO_URL, {
    dbName: process?.env?.DB_NAME,
  })
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err, "Error while connecting to database"));

module.exports = {
  connection,
};
