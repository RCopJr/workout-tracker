import { useEffect, useState } from "react";
import BtnSolid from "./BtnSolid";
import ExerciseHeading from "./ExerciseHeading";
import RoutinePreviewCard from "./RoutinePreviewCard";
import Workouts from "./Workouts";

function App() {
  const { workoutId, setWorkoutId } = useState({});
  return <Workouts workoutId={workoutId} setWorkoutId={setWorkoutId} />;
}

export default App;
