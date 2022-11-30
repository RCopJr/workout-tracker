import axios from "axios";
import { useEffect, useState } from "react";
import "../App.css";
import BtnSolid from "./BtnSolid";
import ExerciseHeading from "./ExerciseHeading";
import RoutinePreviewCard from "./RoutinePreviewCard";

function App() {
  const [workout, setWorkout] = useState([
    {
      workoutName: "",
      exercises: [
        {
          exerciseName: "",
          sets: [
            {
              set: 0,
              weight: 0,
              reps: "",
              rest: 0,
            },
          ],
        },
      ],
    },
  ]);

  useEffect(() => {
    const getWorkout = async () => {
      try {
        const response = await axios.get("http://localhost:3001/");
        setWorkout(response);
      } catch (error) {
        console.error(error);
      }
    };
    getWorkout();
  }, []);

  return (
    <div className="App">
      <RoutinePreviewCard />
    </div>
  );
}

export default App;
