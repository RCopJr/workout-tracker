import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { useQuery } from "react-query";
import { v4 as uuidv4 } from "uuid";
import * as api from "../workoutsAPI";
import ExerciseDataHeader from "./ExerciseDataHeader";
import ExerciseHeading from "./ExerciseHeading";
import SetEntry from "./SetEntry";
import WorkoutNote from "./WorkoutNote";
import Workouts from "./Workouts";
import WorkoutTitle from "./WorkoutTitle";

const WorkoutView = (props) => {
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
          <Dialog.Title>
            <WorkoutTitle name={props.workout.name} />
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
        <WorkoutNote note={props.workout.note} />
      </div>

      {props.workout.exercises.allIds.map((id) => {
        const keyId = uuidv4();
        const { name, sets } = props.workout.exercises.byId[id];
        return (
          <div key={keyId}>
            <ExerciseHeading name={name} />
            <ExerciseDataHeader inEditMode={props.inEditMode} />
            {sets.map((id, index) => {
              const { weight, reps, rest } = props.workout.sets[id];
              const keyId = uuidv4();
              return (
                <SetEntry
                  key={keyId}
                  setNum={index + 1}
                  weight={weight}
                  reps={reps}
                  rest={rest}
                />
              );
            })}
          </div>
        );
      })}
    </>
  );
};

export default WorkoutView;
