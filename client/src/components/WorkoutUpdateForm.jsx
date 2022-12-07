import { useAutoAnimate } from "@formkit/auto-animate/react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog } from "@headlessui/react";
import React, { useState } from "react";
import { QueryClient, useMutation, useQueryClient } from "react-query";
import { v4 as uuidv4 } from "uuid";
import * as api from "../workoutsAPI";
import BtnSolid from "./BtnSolid";
import ExerciseInputSection from "./ExerciseInputSection";
import WorkoutNoteInput from "./WorkoutNoteInput";
import WorkoutTitleInput from "./WorkoutTitleInput";

const WorkoutUpdateForm = (props) => {
  const [animationParent] = useAutoAnimate({ duration: 100 });
  const [fields, setFields] = useState({ ...props.workout });

  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(api.updateWorkout, {
    onSuccess: (workout) => {
      queryClient.setQueryData(["workouts", workout.id], workout);
      props.setInEditMode(false);
    },
  });

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
          byId: {
            [exerciseId]: { sets: setsToRemove },
            ...remainingExercises
          },
        },
        sets,
      } = prevFields;

      const remainingIds = prevFields.exercises.allIds.filter(
        (id) => id !== exerciseId
      );

      const setsToKeep = Object.keys(sets).filter((setId) => {
        return !setsToRemove.includes(setId);
      });

      const newSetsObject = Object.assign(
        {},
        ...setsToKeep.map((setId) => ({ [setId]: sets[setId] }))
      );

      return {
        ...prevFields,
        exercises: {
          byId: {
            ...remainingExercises,
          },
          allIds: remainingIds,
        },
        sets: newSetsObject,
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

  const handleChangeWorkoutTitle = (event) => {
    const newVal = event.target.value;

    setFields((prevFields) => ({
      ...prevFields,
      name: newVal,
    }));
  };

  const handleWorkoutNote = (event) => {
    const newVal = event.target.value;

    setFields((prevFields) => ({
      ...prevFields,
      note: newVal,
    }));
  };

  const handleMoveExerciseUp = (event, exerciseId) => {
    setFields((prevFields) => {
      const {
        exercises: { allIds },
      } = prevFields;
      const exerciseIdIndex = allIds.indexOf(exerciseId);
      const swappedExercise = allIds[exerciseIdIndex - 1];
      const prefixArray = allIds.slice(0, exerciseIdIndex - 1);
      const suffixArray = allIds.slice(
        exerciseIdIndex + 1 <= allIds.length - 1
          ? exerciseIdIndex + 1
          : allIds.length
      );

      return {
        ...prevFields,
        exercises: {
          ...prevFields.exercises,
          allIds: [...prefixArray, exerciseId, swappedExercise, ...suffixArray],
        },
      };
    });
  };

  const handleMoveExerciseDown = (event, exerciseId) => {
    setFields((prevFields) => {
      const {
        exercises: { allIds },
      } = prevFields;
      const exerciseIdIndex = allIds.indexOf(exerciseId);
      const swappedExercise = allIds[exerciseIdIndex + 1];
      const prefixArray = allIds.slice(0, exerciseIdIndex);
      const suffixArray = allIds.slice(
        exerciseIdIndex + 2 <= allIds.length - 1
          ? exerciseIdIndex + 2
          : allIds.length
      );

      return {
        ...prevFields,
        exercises: {
          ...prevFields.exercises,
          allIds: [...prefixArray, swappedExercise, exerciseId, ...suffixArray],
        },
      };
    });
  };

  const handleClickSave = (event) => {
    mutate(fields);
  };

  if (isLoading) {
    return <div>Saving Data...</div>;
  }

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
            <WorkoutTitleInput
              name={fields.name}
              handleChangeWorkoutTitle={handleChangeWorkoutTitle}
            />
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
        <WorkoutNoteInput
          workoutId={props.workoutId}
          note={fields.note}
          handleWorkoutNote={handleWorkoutNote}
        />
      </div>
      <div key={props.workoutId} ref={animationParent}>
        {fields.exercises.allIds.map((exerciseId) => {
          const { name, sets: setIds } = fields.exercises.byId[exerciseId];
          const keyId = exerciseId;
          return (
            <ExerciseInputSection
              key={keyId}
              exerciseId={exerciseId}
              name={name}
              workout={props.workout}
              handleRemoveExercise={handleRemoveExercise}
              handleChangeExercise={handleChangeExercise}
              inEditMode={props.inEditMode}
              setIds={setIds}
              handleRemoveSet={handleRemoveSet}
              handleChangeSet={handleChangeSet}
              fields={fields}
              handleDuplicateSet={handleDuplicateSet}
              handleAddSet={handleAddSet}
              handleMoveExerciseUp={handleMoveExerciseUp}
              handleMoveExerciseDown={handleMoveExerciseDown}
              isFirstExercise={
                fields.exercises.allIds &&
                fields.exercises.allIds[0] === exerciseId
              }
              isLastExercise={
                fields.exercises.allIds &&
                fields.exercises.allIds[fields.exercises.allIds.length - 1] ===
                  exerciseId
              }
            />
          );
        })}
      </div>
      <div className="mt-8 flex justify-center">
        <BtnSolid
          onClick={handleAddExercise}
          arguments={[]}
          variant="blue-light"
          text="Add Exercise"
        />
      </div>
      <div className="mt-8 flex justify-center">
        <BtnSolid
          variant="blue-dark"
          text="Save"
          onClick={handleClickSave}
          arguments={[]}
        />
      </div>
      <div className="mt-8 flex justify-center">
        <BtnSolid variant="red-light" text="Delete Workout" />
      </div>
    </>
  );
};

export default WorkoutUpdateForm;
