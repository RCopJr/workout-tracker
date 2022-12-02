import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { useQuery } from "react-query";
import { v4 as uuidv4 } from "uuid";
import * as api from "../workoutsAPI";
import BtnSolid from "./BtnSolid";
import ExerciseDataHeader from "./ExerciseDataHeader";
import ExerciseHeadingInput from "./ExerciseHeadingInput";
import SetEntry from "./SetEntry";
import SetEntryInput from "./SetEntryInput";
import WorkoutNoteInput from "./WorkoutNoteInput";

const WorkoutUpdateForm = (props) => {
  const {
    data: workout,
    isLoading,
    isError,
  } = useQuery(["workout", props.workoutId], () =>
    api.getWorkout(props.workoutId)
  );
  if (isLoading) {
    return "loading..";
  }

  if (isError) {
    return "Error happened";
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
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <div className="flex justify-center items-center">
          <Dialog.Title as="h2" className="font-extrabold text-lg">
            Legs
          </Dialog.Title>
        </div>
        <div className="flex justify-end items-center">
          <button
            className="text-blue-400 text-lg"
            onClick={() => {
              props.setInEditMode(false);
            }}
          >
            View
          </button>
        </div>
      </div>
      <div className="mt-3">
        <WorkoutNoteInput note={workout.note} />
      </div>
      {workout.exercises.map((exercise) => {
        const id = uuidv4();
        return (
          <div key={id}>
            <ExerciseHeadingInput name={exercise.name} />
            <ExerciseDataHeader />
            {exercise.sets.map((set, i) => {
              const { weight, reps, rest } = set;
              const id = uuidv4();
              return (
                <SetEntryInput
                  key={id}
                  setNum={i + 1}
                  weight={weight}
                  reps={reps}
                  rest={rest}
                />
              );
            })}
          </div>
        );
      })}

      <Transition
        appear
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="mt-8 flex justify-center">
          <BtnSolid variant="red-light" text="Delete Workout" />
        </div>
      </Transition>
    </>
  );
};

export default WorkoutUpdateForm;
