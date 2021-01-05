const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  type: {
    type: String,
    enum: ["Resistance", "Cardio"],
    required: "Enter a type of workout",
  },
  name: {
    type: String,
    trim: true,
    required: "Enter a name for the workout",
    unique: true,
  },
  duration: {
    type: Number,
    required: true,
    min: [1],
    trim: true,
  },
  weight: {
    type: Number,
    required: "Enter desired weight",
    min: [1],
    trim: true,
  },
  set: {
    type: Number,
    required: true,
    min: [1],
    trim: true,
  },
  reps: {
    type: Number,
    required: true,
    min: [1],
    trim: true,
  },
  distance: {
    type: Number,
    required: true,
    min: [0.25],
    trim: true,
  },
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Transaction;
