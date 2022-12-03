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
import WorkoutTitleInput from "./WorkoutTitleInput";

const WorkoutUpdateForm = (props) => {
  const [fields, setFields] = useState({ ...props.workout });

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
        <WorkoutNoteInput note={fields.note} />
      </div>
      {/* {fields.exercises.map((exercise) => {
        const id = uuidv4();
        return (
          <React.Fragment key={id}>
            <ExerciseHeadingInput name={exercise.name} />
            <ExerciseDataHeader inEditMode={props.inEditMode} />
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
            <div className="mt-5 flex justify-center gap-3">
              <BtnSolid variant="gray-sm" text="+ Add Set" />
              <BtnSolid variant="gray-sm" text="+ Duplicate Set" />
            </div>
          </React.Fragment>
        );
      })} */}
      <div className="mt-8 flex justify-center">
        <BtnSolid variant="blue-light" text="Add Exercise" />
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
