const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

mongoose.connect(process.env.DB_URI);

const workoutSchema = {
  name: String,
  note: String,
  exercises: [
    {
      name: String,
      sets: [
        {
          weight: String,
          reps: String,
          rest: String,
        },
      ],
    },
  ],
};

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
