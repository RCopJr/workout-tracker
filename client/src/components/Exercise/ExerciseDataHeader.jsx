import React, { Fragment } from "react";

const ExerciseDataHeader = (props) => {
  return (
    <>
      <div className="flex justify-between mt-4 gap-x-6">
        <div className="font-extrabold w-1/6 text-center">Set</div>
        <div className="font-extrabold w-1/4 text-center">lbs</div>
        <div className="font-extrabold w-1/4 text-center">Reps</div>
        <div className="font-extrabold w-1/4 text-center">Rest</div>
        {props.inEditMode && (
          <div className="font-extrabold w-1/12 text-center"></div>
        )}
      </div>
    </>
  );
};

export default ExerciseDataHeader;
