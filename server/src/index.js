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
  workouts: [workoutSchema],
};

const User = mongoose.model("User", userSchema);

const Workout = mongoose.model("Workout", workoutSchema);

const normalizeWorkouts = (workouts) => {
  let normalizedWorkouts = { byId: {}, allIds: [] };

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

app.get("/workouts", (req, res) => {
  User.findOne({ name: { $eq: "Monching" } }, (err, foundUser) => {
    if (err) {
      res.send(err);
    } else {
      const workouts = foundUser.workouts;
      let normalizedWorkouts = normalizeWorkouts(workouts);
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
      let normalizedWorkout = normalizeWorkout(workout);
      res.json(normalizedWorkout);
    }
  });
});

app.post("/workouts", async (req, res) => {
  const workout = new Workout({
    name: "Test Workout 2",
    note: "test note",
    exercises: [
      {
        name: "test exercise",
        sets: [
          {
            weight: "120",
            reps: "10",
            rest: "100",
          },
          {
            weight: "120",
            reps: "10",
            rest: "100",
          },
        ],
      },
      {
        name: "test exercise 2",
        sets: [
          {
            weight: "120",
            reps: "10",
            rest: "100",
          },
        ],
      },
    ],
  });

  workout.save();

  User.findOneAndUpdate(
    { name: { $eq: "Monching" } },
    { $push: { workouts: workout } },
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

app.put("/workouts/:id", async (req, res) => {
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

  res.json({
    exercises: denormalizedExercises,
  });

  // Workout.updateOne(
  //   {
  //     _id: id,
  //     $or: [
  //       { name: { $ne: workout.name } },
  //       { note: { $ne: workout.note } },
  //       { exercises: { $ne: denormalizedExercises } },
  //     ],
  //   },
  //   {
  //     $set: {
  //       given_name: new_data.given_name,
  //       family_name: new_data.family_name,
  //       email: new_data.email,
  //       picture: new_data.picture,
  //     },
  //   }
  // );
});

app.delete("/workouts/:id", async (req, res) => {
  const { id } = req.params;

  Workout.deleteOne({ name: { $eq: "Test Workout" } }, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });

  User.findOneAndUpdate(
    { name: { $eq: "Monching" } },
    { $pull: { workouts: { name: { $eq: "Test Workout" } } } },
    { new: true },
    (err, newUserData) => {
      if (err) {
        res.send(err);
        console.log("error occured");
      } else {
        res.json(newUserData);
        console.log("newUserData");
      }
    }
  );
});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
