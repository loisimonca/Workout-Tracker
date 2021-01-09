// 1. Require Express
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const mongojs = require("mongojs");

// 2. Create an instance of Express
const app = express();
// 3. Set the PORT
const PORT = process.env.PORT || 8080;

const db = require("./models");
// const { Workout } = require("./models");
const workoutSchema = require("./models/workout");

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
app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/exercise.html"));
});
app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/stats.html"));
});

// API ROUTES

app.get("/api/workouts/range", function (req, res) {
  db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration",
        },
      },
    },
  ])
    .sort({ _id: -1 })
    .limit(7)
    .then((foundWorkouts) => {
      res.json(foundWorkouts);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        error: true,
        data: null,
        message: "Failed to retrieve the combined workout range.",
      });
    });
});

// app.get("/api/workouts", (req, res) => {
//   db.Workout.find().then((foundWorkouts) => {
//     res.json(foundWorkouts);
//   });
// });
app.get("/api/workouts", (req, res) => {
  db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration",
        },
      },
    },
  ]).then((foundWorkout) => {
    res.json(foundWorkout);
  });
});

// app.get("/api/workouts/:id", (req, res) => {
//   db.Workout.find({ _id: mongojs.ObjectID(req.params.id) }).then(
//     (foundWorkouts) => {
//       res.json(foundWorkouts);
//     }
//   );
// });

app.post("/api/workouts", (req, res) => {
  db.Workout.create(req.body).then((newWorkout) => {
    res.json(newWorkout);
  });
});

app.put("/api/workouts/:id", (req, res) => {
  db.Workout.updateOne(
    { _id: mongojs.ObjectID(req.params.id) },
    {
      $push: {
        exercises: req.body,
      },
    },
    (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.send(data);
      }
    }
  );
});

// 4. Listen on the PORT.
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
