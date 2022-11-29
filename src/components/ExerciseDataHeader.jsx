import React from "react";
import ExerciseHeading from "./ExerciseHeading";

const ExerciseDataHeader = (props) => {
  return (
    <>
      <div className="flex justify-between mt-5 gap-x-6">
        <div className="font-extrabold w-1/6 text-center">Set</div>
        <div className="font-extrabold w-1/4 text-center">lbs</div>
        <div className="font-extrabold w-1/4 text-center">Reps</div>
        <div className="font-extrabold w-1/4 text-center">Rest (s)</div>
      </div>
    </>
  );
};

export default ExerciseDataHeader;
