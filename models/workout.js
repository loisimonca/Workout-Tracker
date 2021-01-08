const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now(),
  },
  exercises: [
    {
      type: {
        type: String,
        required: "Enter a type of workout",
      },

      name: {
        type: String,
        trim: true,
        required: "Enter a name for the workout",
      },
      duration: {
        type: Number,
        required: true,
        min: [1],
        trim: true,
      },
      weight: {
        type: Number,
        min: [1],
        trim: true,
      },
      set: {
        type: Number,
        min: [1],
        trim: true,
      },
      reps: {
        type: Number,
        min: [1],
        trim: true,
      },
      distance: {
        type: Number,
        min: [0.25],
        trim: true,
      },
    },
  ],
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
