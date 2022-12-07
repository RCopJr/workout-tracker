import { useState } from "react";
import Workouts from "./Workouts";

function App() {
  const { workoutId, setWorkoutId } = useState("");
  return <Workouts workoutId={workoutId} setWorkoutId={setWorkoutId} />;
}

export default App;
