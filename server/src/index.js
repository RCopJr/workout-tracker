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

mongoose.connect(
  "mongodb+srv://ramonito:KbYNEmJye5Oe9nMM@cluster0.a4ftivq.mongodb.net/usersDB"
);

const workoutSchema = {
  name: String,
  note: String,
  exercises: [
    {
      id: String,
      name: String,
      sets: {
        id: String,
        name: String,
        weight: String,
        reps: String,
        rest: String,
      },
    },
  ],
};

const userSchema = {
  name: String,
  workouts: [workoutSchema],
};

const User = mongoose.model("User", userSchema);

const Workout = mongoose.model("Workout", workoutSchema);

const workoutCollectionSchema = {
  byId: mongoose.Schema.Types.Mixed,
  allIds: [String],
};

const WorkoutCollection = mongoose.model(
  "WorkoutCollection",
  workoutCollectionSchema
);

app.get("/testInsert", (req, res) => {});

app.get("/workouts", (req, res) => {
  WorkoutCollection.find({}, (err, workoutCollection) => {
    console.log(workoutCollection);
    if (err) {
      res.send(err);
    } else {
      res.json(workoutCollection[0]);
    }
  });
});

app.get("/workouts/:id", (req, res) => {
  const { id } = req.params;
  WorkoutCollection.find({}, (err, workoutCollection) => {
    if (err) {
      res.send(err);
    } else {
      res.json(workoutCollection[0].byId[id]);
    }
  });
});

app.post("/workouts", async (req, res) => {
  const workout = new Workout({
    name: "Test Workout",
    note: "",
    exercises: [],
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

app.put("/workouts/:id", async (req, res) => {});

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
