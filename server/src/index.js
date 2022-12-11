require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(cors());

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

const userSchema = {
  name: String,
  workouts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Workout" }],
};

const User = mongoose.model("User", userSchema);

const Workout = mongoose.model("Workout", workoutSchema);

app.get("/workouts", (req, res) => {
  User.findOne({ name: { $eq: "Monching" } }, async (err, foundUser) => {
    if (err) {
      res.send(err);
    } else {
      const populatedUser = await foundUser.populate("workouts");
      let normalizedWorkouts = normalizeWorkouts(populatedUser.workouts);
      res.json(normalizedWorkouts);
    }
  });
});

app.get("/workouts/:id", (req, res) => {
  const { id } = req.params;
  Workout.findById(id, (err, foundWorkout) => {
    if (err) {
      res.send(err);
    } else {
      const workout = foundWorkout;
      // console.log("workout in get:", workout, id);
      let normalizedWorkout = normalizeWorkout(workout);
      res.json(normalizedWorkout);
    }
  });
});

app.post("/workouts", async (req, res) => {
  const workout = new Workout({
    name: "New Workout",
    note: "",
    exercises: [],
  });

  workout.save();

  User.findOneAndUpdate(
    { name: { $eq: "Monching" } },
    { $push: { workouts: workout._id } },
    { new: true },
    (err, newUserData) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log(`Successfully update Monching with new workout`);
        res.json(newUserData);
      }
    }
  );
});

app.put("/workouts/:id", (req, res) => {
  const { id } = req.params;
  const { workout } = req.body;

  const denormalizedExercises = [];

  workout.exercises.allIds.map((exerciseId) => {
    const { name } = workout.exercises.byId[exerciseId];
    const denormalizedSets = workout.exercises.byId[exerciseId].sets.map(
      (setId) => {
        const { name, weight, reps, rest } = workout.sets[setId];
        return {
          name: name,
          weight: weight,
          reps: reps,
          rest: rest,
        };
      }
    );

    let newExercise = {
      name: name,
      sets: denormalizedSets,
    };

    denormalizedExercises.push(newExercise);
  });

  Workout.findOneAndUpdate(
    {
      _id: { $eq: id },
    },
    {
      name: workout.name,
      note: workout.note,
      exercises: denormalizedExercises,
    },
    { upsert: true },
    (err, newWorkoutData) => {
      if (err) {
        res.send(err);
      } else {
        res.send(newWorkoutData);
      }
    }
  );
});

app.delete("/workouts/:id", (req, res) => {
  const { id } = req.params;

  Workout.deleteOne({ _id: { $eq: id } }, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });

  User.findOneAndUpdate(
    { name: { $eq: "Monching" } },
    { $pull: { workouts: id } },
    { new: true },
    (err, newUserData) => {
      if (err) {
        res.send(err);
        console.log("error occured");
      } else {
        res.json(newUserData);
      }
    }
  );
});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});

const normalizeWorkouts = (workouts) => {
  let normalizedWorkouts = { byId: {}, allIds: [] };

  //console.log("workouts:", workouts);
  workouts.forEach((workout) => {
    const { _id: workoutId } = workout;
    const normalizedWorkout = normalizeWorkout(workout);
    normalizedWorkouts.byId[workoutId] = normalizedWorkout;
    normalizedWorkouts.allIds.push(workoutId);
  });

  return normalizedWorkouts;
};

const normalizeWorkout = (workout) => {
  const { _id: workoutId, name, note, exercises } = workout;
  const normalizedWorkout = {
    id: workoutId,
    name: name,
    note: note,
    exercises: {},
    sets: {},
  };
  let normalizedExercises = { byId: {}, allIds: [] };
  let normalizedSets = {};
  exercises.forEach((exercise) => {
    const { _id: exerciseId, sets, name } = exercise;
    normalizedExercises.byId[exerciseId] = {
      id: exerciseId,
      name: name,
      sets: [],
    };
    normalizedExercises.allIds.push(exerciseId);
    sets.forEach((set) => {
      const { _id: setId, weight, reps, rest } = set;
      normalizedSets[setId] = {
        weight: weight,
        reps: reps,
        rest: rest,
      };
      normalizedExercises.byId[exerciseId].sets.push(setId);
    });
  });

  normalizedWorkout.exercises = normalizedExercises;
  normalizedWorkout.sets = normalizedSets;

  return normalizedWorkout;
};
