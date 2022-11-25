import React from "react";
import ExerciseDropdown from "./ExerciseDropdown";
const ExerciseHeading = (props) => {
  return (
    <>
      <div className="flex max-w-xl justify-between items-center">
        <h1 className="font-bold text-sky-500">Bench Press (Barbell)</h1>
        <ExerciseDropdown />
      </div>
    </>
  );
};

export default ExerciseHeading;
