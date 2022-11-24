import { useState } from "react";
import "../App.css";
import BtnSolid from "./BtnSolid";
import Card from "./Card";
import ExerciseHeading from "./ExerciseHeading";

function App() {
  const [count, setCount] = useState(0);

  const handleClick = (event) => {
    setCount(count + 1);
    console.log(count);
  };

  return (
    <div className="App">
      <BtnSolid handleClick={handleClick} />
      <Card />
      <ExerciseHeading />
    </div>
  );
}

export default App;
