import React from "react";
import ExerciseDropdown from "./ExerciseDropdown";
const ExerciseHeading = (props) => {
  return (
    <>
      <div className="mt-5 flex max-w-xl justify-between items-center">
        <div className="flex-1">
          <h1 className="font-bold text-sky-500">
            {props.inEditMode ? (
              <input
                type="text"
                className="font-bold text-sky-500 w-full"
                placeholder="Bench Press (Barbell)"
              ></input>
            ) : (
              <p className="text-ellipsis">Bench Press (Barbell)</p>
            )}
          </h1>
        </div>
        <div>{props.inEditMode && <ExerciseDropdown />}</div>
      </div>
    </>
  );
};

export default ExerciseHeading;
