// 1. Require Express
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

// 2. Create an instance of Express
const app = express();
// 3. Set the PORT
const PORT = process.env.PORT || 8080;

const db = require("./models");
// const workoutSchema = require("./models/workout");

// 5. Add middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname + "/public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Mongoose connected successfully");
});

connection.on("error", (err) => {
  console.log("Mongoose connected error: " + err);
});
// VIEW ROUTES
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});
// API ROUTES
app.get("/api/config", (req, res) => {
  res.json({
    success: true,
  });
});

// console.log(workoutSchema);

app.get("/api/workouts", (req, res) => {
  db.Workout.find().then((foundWorkouts) => {
    res.json(foundWorkouts);
  });
});

app.get("/api/workouts/:name", (req, res) => {
  for (let i = 0; i < donuts.length; i++) {
    if (donuts[i].name === req.params.name) {
      return res.json(donuts[i]);
    }
  }
});

app.post("/api/workouts", (req, res) => {
  db.Workout.create(req.body).then((newWorkout) => {
    res.json(newWorkout);
  });
});

// 4. Listen on the PORT.
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
