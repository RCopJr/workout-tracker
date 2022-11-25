import { useState } from "react";
import "../App.css";
import BtnSolid from "./BtnSolid";
import ExerciseHeading from "./ExerciseHeading";
import RoutinePreviewCard from "./RoutinePreviewCard";

function App() {
  const [count, setCount] = useState(0);

  const handleClick = (event) => {
    setCount(count + 1);
    console.log(count);
  };

  return (
    <div className="App">
      <BtnSolid handleClick={handleClick} />
      <RoutinePreviewCard />
      <ExerciseHeading />
    </div>
  );
}

export default App;
