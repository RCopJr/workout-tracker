import React from "react";
import ExerciseDropdown from "./ExerciseDropdown";

const ExerciseHeadingInput = (props) => {
  const getPlaceHolderValue = (originalExerciseIds, exerciseId) => {
    return exerciseId in originalExerciseIds
      ? originalExerciseIds[exerciseId].name
      : "New Exercise";
  };

  return (
    <div className="mt-5 flex max-w-xl justify-between items-center">
      <div className="flex-1">
        <h1 className="font-bold text-sky-500">
          <input
            type="text"
            onChange={(event) => {
              props.handleChangeExercise(event, props.exerciseId);
            }}
            className="font-bold text-sky-500 w-full"
            placeholder={getPlaceHolderValue(
              props.originalExerciseIds,
              props.exerciseId
            )}
            value={props.name}
          ></input>
        </h1>
      </div>
      <div>
        <ExerciseDropdown
          exerciseId={props.exerciseId}
          handleRemoveExercise={props.handleRemoveExercise}
          handleMoveExerciseUp={props.handleMoveExerciseUp}
          handleMoveExerciseDown={props.handleMoveExerciseDown}
          isFirstExercise={props.isFirstExercise}
          isLastExercise={props.isLastExercise}
        />
      </div>
    </div>
  );
};

export default ExerciseHeadingInput;
