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
  "mongodb+srv://ramonito:KbYNEmJye5Oe9nMM@cluster0.a4ftivq.mongodb.net/workoutsDB",
  { useNewUrlParser: true }
);

const workoutCollectionSchema = {
  byId: mongoose.Schema.Types.Mixed,
  allIds: [String],
};

const WorkoutCollection = mongoose.model(
  "WorkoutCollection",
  workoutCollectionSchema
);

const exampleCollection = new WorkoutCollection({
  byId: {
    w1: {
      id: "w1",
      name: "Test Workout",
      note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      exercises: {
        byId: {
          e1: {
            id: "e1",
            name: "Excercise 1",
            sets: ["e1set1", "e1set2", "e1set3"],
          },
          e2: {
            id: "e2",
            name: "Exercise 2",
            sets: ["e2set1", "e2set2"],
          },
        },
        allIds: ["e1", "e2"],
      },
      sets: {
        e1set1: {
          weight: 10,
          reps: "8-12",
          rest: 150,
        },
        e1set2: {
          weight: 10,
          reps: "8-12",
          rest: 150,
        },
        e1set3: {
          weight: 10,
          reps: "8-12",
          rest: 150,
        },
        e2set1: {
          weight: 10,
          reps: "8-12",
          rest: 150,
        },
        e2set2: {
          weight: 10,
          reps: "8-12",
          rest: 150,
        },
      },
    },
    w2: {
      id: "w2",
      name: "Test Workout",
      note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      exercises: {
        byId: {
          e1: {
            id: "e1",
            name: "Excercise 1",
            sets: ["e1set1", "e1set2", "e1set3"],
          },
          e2: {
            id: "e2",
            name: "Exercise 2",
            sets: ["e2set1", "e2set2"],
          },
        },
        allIds: ["e1", "e2"],
      },
      sets: {
        e1set1: {
          weight: 10,
          reps: "8-12",
          rest: 150,
        },
        e1set2: {
          weight: 10,
          reps: "8-12",
          rest: 150,
        },
        e1set3: {
          weight: 10,
          reps: "8-12",
          rest: 150,
        },
        e2set1: {
          weight: 10,
          reps: "8-12",
          rest: 150,
        },
        e2set2: {
          weight: 10,
          reps: "8-12",
          rest: 150,
        },
      },
    },
  },
  allIds: ["w1", "w2"],
});

// WorkoutCollection.insertMany(exampleCollection, (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("success");
//   }
// });

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
    //console.log(workoutCollection);
    if (err) {
      res.send(err);
    } else {
      res.json(workoutCollection[0].byId[id]);
    }
  });
});

app.post("/workouts", async (req, res) => {
  try {
    const workoutId = uuidv4();
    const newWorkout = {
      id: workoutId,
      name: "New Workout",
      note: "",
      exercises: {
        byId: {},
        allIds: [],
      },
      sets: {},
    };

    let workouts = await WorkoutCollection.findOne({});

    workouts.byId[workoutId] = newWorkout;
    workouts.allIds.push(workoutId);

    let newWorkouts = await WorkoutCollection.findOneAndUpdate({}, workouts);
    res.json(newWorkouts);
  } catch (err) {
    res.send(err);
  }
});

app.put("/workouts/:id", async (req, res) => {
  const { id } = req.params;
  const { workout } = req.body;

  try {
    let workouts = await WorkoutCollection.findOne({});
    workouts.byId[id] = workout;

    let newWorkouts = await WorkoutCollection.findOneAndUpdate({}, workouts);
    res.json(newWorkouts.byId[id]);
  } catch (err) {
    res.send(err);
  }
});

app.delete("/workouts/:id", async (req, res) => {
  const { id } = req.params;

  try {
    let workouts = await WorkoutCollection.findOne({});

    delete workouts.byId[id];

    const workoutIdIndex = workouts.allIds.indexOf(id);

    if (workoutIdIndex > -1) {
      workouts.allIds.splice(workoutIdIndex, 1);
    }

    let newWorkouts = await WorkoutCollection.findOneAndUpdate({}, workouts);
    res.json(newWorkouts);
  } catch (err) {
    res.send(err);
  }
});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
