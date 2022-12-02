import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { useQuery } from "react-query";
import * as api from "../workoutsAPI";
import BtnSolid from "./BtnSolid";
import ExerciseDataHeader from "./ExerciseDataHeader";
import ExerciseHeading from "./ExerciseHeading";
import SetEntry from "./SetEntry";
import WorkoutNote from "./WorkoutNote";
import Workouts from "./Workouts";

const WorkoutView = (props) => {
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
            {workout.name}
          </Dialog.Title>
        </div>
        <div className="flex justify-end items-center">
          <button
            className="text-blue-400 text-lg"
            onClick={() => {
              props.setInEditMode(true);
            }}
          >
            Edit
          </button>
        </div>
      </div>
      <div className="mt-3">
        <WorkoutNote note={workout.note} />
      </div>

      {workout.exercises.map((exercise, index) => {
        return <ExerciseHeading key={index} name={exercise.name} />;
      })}
    </>
  );
};

export default WorkoutView;
