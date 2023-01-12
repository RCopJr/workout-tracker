require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(cors());

const Workout = require("./models/workoutModel");
const User = require("./models/userModel");

const functions = require("./functions");
const normalizeWorkout = functions.normalizeWorkout;
const normalizeWorkouts = functions.normalizeWorkouts;

//USER API ROUTES
app
  .route("/users")
  .post((req, res) => {
    res.json({ message: "Register User" });
  })
  .get((req, res) => {
    res.json({ message: "Get User" });
  });

app.post("/users/login", (req, res) => {
  res.json({ message: "Login User" });
});

app.post("/users/login", (req, res) => {
  res.json({ message: "Login User" });
});

//WORKOUT API ROUTES
app
  .route("/workouts")

  .get((req, res) => {
    User.findOne({ name: { $eq: "Monching" } }, async (err, foundUser) => {
      if (err) {
        res.send(err);
      } else {
        const populatedUser = await foundUser.populate("workouts");
        let normalizedWorkouts = normalizeWorkouts(populatedUser.workouts);
        res.json(normalizedWorkouts);
      }
    });
  })
  .post(async (req, res) => {
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

app
  .route("/workouts/:id")
  .get((req, res) => {
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
  })
  .put((req, res) => {
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
  })
  .delete((req, res) => {
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
