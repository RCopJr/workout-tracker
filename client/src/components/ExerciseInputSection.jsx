import { useAutoAnimate } from "@formkit/auto-animate/react";
import React from "react";
import BtnSolid from "./BtnSolid";
import ExerciseDataHeader from "./ExerciseDataHeader";
import ExerciseHeadingInput from "./ExerciseHeadingInput";
import SetEntryInput from "./SetEntryInput";

const ExerciseInputSection = (props) => {
  const [animationParent] = useAutoAnimate({ duration: 100 });
  return (
    <div>
      <ExerciseHeadingInput
        exerciseId={props.exerciseId}
        originalExerciseIds={props.workout.exercises.byId}
        name={props.name}
        handleRemoveExercise={props.handleRemoveExercise}
        handleChangeExercise={props.handleChangeExercise}
        handleMoveExerciseUp={props.handleMoveExerciseUp}
        handleMoveExerciseDown={props.handleMoveExerciseDown}
        isFirstExercise={props.isFirstExercise}
        isLastExercise={props.isLastExercise}
      />
      <ExerciseDataHeader inEditMode={props.inEditMode} />
      <div ref={animationParent}>
        {props.setIds.map((setId, index) => {
          const { weight, reps, rest } = props.fields.sets[setId];
          return (
            <SetEntryInput
              key={setId}
              exerciseId={props.exerciseId}
              originalSets={props.workout.sets}
              setId={setId}
              setNum={index + 1}
              weight={weight}
              reps={reps}
              rest={rest}
              handleRemoveSet={props.handleRemoveSet}
              handleChangeSet={props.handleChangeSet}
            />
          );
        })}
      </div>
      <div className="mt-5 flex justify-center gap-3">
        <BtnSolid
          variant="gray-sm"
          text="+ Add Set"
          onClick={props.handleAddSet}
          arguments={[props.exerciseId]}
        />
        <BtnSolid
          variant="gray-sm"
          text="+ Duplicate Set"
          onClick={props.handleDuplicateSet}
          arguments={[props.exerciseId]}
        />
      </div>
    </div>
  );
};

export default ExerciseInputSection;
