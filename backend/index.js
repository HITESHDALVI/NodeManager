const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const notes = require("./data/notes");
const { userRouter } = require("./routes/user.routes");
const { noteRouter } = require("./routes/note.routes");
require("./db");
require("dotenv").config();

const app = express();
var corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
// app.use(express.json());
// app.use(
//   express.urlencoded({
//     extended: true,
//   })
// );
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.use("/api/v1/user", userRouter);

app.use("/api/v1/note", noteRouter);

app.get("/", async (req, res) => {
  res.redirect("/api/v1/user/login");
});
app.get("/api/notes", async (req, res) => {
  res.json({ notes, message: "data fetched successfully!" });
});
app.get("/api/notes/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const filterById = notes.filter((item) => item._id === id);
    if (filterById.length === 0) {
      return res
        .status(404)
        .json({ notes: filterById, message: "No Data found", status: 404 });
    }
    res.json({
      notes: filterById,
      message: "data fetched successfully!",
      status: 200,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      status: 500,
    });
    console.log({ err });
  }
});

app.post("/api/notes", async (req, res) => {
  res.send("api is running");
});

app.patch("/api/notes/:id", async (req, res) => {
  res.send("api is running");
});
app.put("/api/notes/:id", async (req, res) => {
  res.send("api is running");
});
app.delete("/api/notes/:id", async (req, res) => {
  res.send("api is running");
});

app.listen(process.env.PORT || 8000, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
