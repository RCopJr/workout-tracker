require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(cors());

const workouts = {
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
};

app.get("/workouts", (req, res) => {
  res.json(workouts);
});

app.get("/workouts/:id", (req, res) => {
  const { id } = req.params;
  const workout = workouts.byId[id];
  res.json(workout);
});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
