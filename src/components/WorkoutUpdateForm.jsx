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
  const defaultValues = { ...props.workout };
  const [fields, setFields] = useState(defaultValues);
  //TODO: implement this when refactorin
  const removeByValue = (value, array) => {};

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
      const {
        exercises: {
          //Need to create alias for [exerciseId] for this to work
          byId: { [exerciseId]: deletedId, ...remainingExercises },
        },
      } = prevFields;

      const remainingIds = prevFields.exercises.allIds.filter(
        (item) => item !== exerciseId
      );

      return {
        ...prevFields,
        exercises: {
          byId: {
            ...remainingExercises,
          },
          allIds: remainingIds,
        },
      };
    });
  };

  const handleChangeExercise = (event, exerciseId) => {
    const newVal = event.target.value;
    setFields((prevFields) => ({
      ...prevFields,
      exercises: {
        ...prevFields.exercises,
        byId: {
          ...prevFields.exercises.byId,
          [exerciseId]: {
            ...prevFields.exercises.byId[exerciseId],
            name: newVal,
          },
        },
      },
    }));
  };

  const updateFieldsWithNewSet = (prevFields, exerciseId, newSet, newId) => {
    const {
      sets: prevSets,
      exercises: prevExercises,
      exercises: {
        byId: {
          [exerciseId]: prevExercise,
          [exerciseId]: { sets: prevSetIds },
        },
      },
      exercises: { byId: prevExerciseIds },
    } = prevFields;

    return {
      ...prevFields,
      sets: {
        ...prevSets,
        [newId]: newSet,
      },
      exercises: {
        ...prevExercises,
        byId: {
          ...prevExerciseIds,
          [exerciseId]: {
            ...prevExercise,
            sets: [...prevSetIds, newId],
          },
        },
      },
    };
  };

  const handleAddSet = (event, exerciseId) => {
    const newId = uuidv4();
    const newSet = {
      weight: "",
      reps: "",
      rest: "",
    };

    setFields((prevFields) => {
      return updateFieldsWithNewSet(prevFields, exerciseId, newSet, newId);
    });
  };

  const handleDuplicateSet = (event, exerciseId) => {
    const newId = uuidv4();

    setFields((prevFields) => {
      const setIds = prevFields.exercises.byId[exerciseId].sets;
      const latestSetId = setIds[setIds.length - 1];
      const newSet = {
        ...prevFields.sets[latestSetId],
      };

      return updateFieldsWithNewSet(prevFields, exerciseId, newSet, newId);
    });
  };

  const handleRemoveSet = (event, exerciseId, setId) => {
    setFields((prevFields) => {
      const {
        sets: { [setId]: deletedId, ...remainingSets },
      } = prevFields;

      const remainingIds = prevFields.exercises.byId[exerciseId].sets.filter(
        (item) => item !== setId
      );

      return {
        ...prevFields,
        exercises: {
          ...prevFields.exercises,
          byId: {
            ...prevFields.exercises.byId,
            [exerciseId]: {
              ...prevFields.exercises.byId[exerciseId],
              sets: remainingIds,
            },
          },
        },
        sets: {
          ...remainingSets,
        },
      };
    });
  };

  const handleChangeSet = (event, setId) => {
    const newVal = event.target.value;
    const name = event.target.name;
    setFields((prevFields) => ({
      ...prevFields,
      sets: {
        ...prevFields.sets,
        [setId]: {
          ...prevFields.sets[setId],
          [name]: newVal,
        },
      },
    }));
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
        const keyId = exerciseId;
        return (
          <div key={keyId}>
            <ExerciseHeadingInput
              exerciseId={exerciseId}
              originalExerciseIds={props.workout.exercises.byId}
              name={name}
              handleRemoveExercise={handleRemoveExercise}
              handleChangeExercise={handleChangeExercise}
            />
            <ExerciseDataHeader inEditMode={props.inEditMode} />
            {setIds.map((setId, index) => {
              const { weight, reps, rest } = fields.sets[setId];
              return (
                <SetEntryInput
                  key={setId}
                  exerciseId={exerciseId}
                  setId={setId}
                  setNum={index + 1}
                  weight={weight}
                  reps={reps}
                  rest={rest}
                  handleRemoveSet={handleRemoveSet}
                  handleChangeSet={handleChangeSet}
                />
              );
            })}
            <div className="mt-5 flex justify-center gap-3">
              <BtnSolid
                variant="gray-sm"
                text="+ Add Set"
                onClick={handleAddSet}
                arguments={[exerciseId]}
              />
              <BtnSolid
                variant="gray-sm"
                text="+ Duplicate Set"
                onClick={handleDuplicateSet}
                arguments={[exerciseId]}
              />
            </div>
          </div>
        );
      })}
      <div className="mt-8 flex justify-center">
        <BtnSolid
          onClick={handleAddExercise}
          arguments={[]}
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
