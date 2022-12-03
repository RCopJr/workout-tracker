import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog } from "@headlessui/react";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import BtnSolid from "./BtnSolid";
import ExerciseDataHeader from "./ExerciseDataHeader";
import ExerciseHeadingInput from "./ExerciseHeadingInput";
import SetEntryInput from "./SetEntryInput";
import WorkoutNoteInput from "./WorkoutNoteInput";
import WorkoutTitleInput from "./WorkoutTitleInput";

const WorkoutUpdateForm = (props) => {
  const [fields, setFields] = useState({ ...props.workout });

  const handleAddExercise = (event) => {
    const newId = uuidv4();
    const newExercise = {
      id: newId,
      name: "",
      sets: [],
    };

    setFields((prevFields) => ({
      ...prevFields,
      exercises: {
        byId: {
          ...prevFields.exercises.byId,
          [newId]: newExercise,
        },
        allIds: [...prevFields.exercises.allIds, newId],
      },
    }));
  };

  const handleRemoveExercise = (event, exerciseId) => {
    setFields((prevFields) => {
      const newFields = { ...prevFields };
      delete newFields.exercises[exerciseId];
      const exerciseIndex = newFields.exercises.allIds.indexOf(exerciseId);
      if (exerciseIndex > -1) {
        newFields.exercises.allIds.splice(exerciseIndex, 1);
      }
      console.log(newFields, exerciseId);
      return newFields;
    });
  };

  return (
    <>
      <div className="grid grid-cols-3">
        <div className="flex justify-start items-center">
          <button
            type="button"
            className="flex items-center bg-gray-200 rounded-md px-2 py-1 focus:outline-none"
            onClick={() => {
              props.closeModal();
              props.setInEditMode(false);
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <div className="flex justify-center items-center">
          <Dialog.Title as="h2" className="font-extrabold text-lg">
            <WorkoutTitleInput name={fields.name} />
          </Dialog.Title>
        </div>
        <div className="flex justify-end items-center">
          <button
            className="text-blue-400 text-lg"
            onClick={() => {
              props.setInEditMode(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
      <div className="mt-3">
        <WorkoutNoteInput workoutId={props.workoutId} note={fields.note} />
      </div>
      {fields.exercises.allIds.map((exerciseId) => {
        const { name, sets: setIds } = fields.exercises.byId[exerciseId];
        const keyId = uuidv4();
        return (
          <React.Fragment key={keyId}>
            <ExerciseHeadingInput
              exerciseId={exerciseId}
              name={name}
              handleRemoveExercise={handleRemoveExercise}
            />
            <ExerciseDataHeader inEditMode={props.inEditMode} />
            {setIds.map((setId, index) => {
              const { weight, reps, rest } = fields.sets[setId];
              const keyId = uuidv4();
              return (
                <SetEntryInput
                  key={keyId}
                  exerciseId={exerciseId}
                  setId={setId}
                  setNum={index + 1}
                  weight={weight}
                  reps={reps}
                  rest={rest}
                />
              );
            })}
            <div className="mt-5 flex justify-center gap-3">
              <BtnSolid variant="gray-sm" text="+ Add Set" />
              <BtnSolid variant="gray-sm" text="+ Duplicate Set" />
            </div>
          </React.Fragment>
        );
      })}

      <div className="mt-8 flex justify-center">
        <BtnSolid
          onClick={handleAddExercise}
          variant="blue-light"
          text="Add Exercise"
        />
      </div>
      <div className="mt-8 flex justify-center">
        <BtnSolid variant="blue-dark" text="Save" />
      </div>
      <div className="mt-8 flex justify-center">
        <BtnSolid variant="red-light" text="Delete Workout" />
      </div>
    </>
  );
};

export default WorkoutUpdateForm;
