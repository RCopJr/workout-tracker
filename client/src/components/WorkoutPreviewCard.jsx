import React, { useState } from "react";
import { useQuery } from "react-query";
import * as api from "../workoutsAPI";
import WorkoutModal from "./WorkoutModal";
import WorkoutNoteInput from "./WorkoutNoteInput";

const WorkoutPreviewCard = (props) => {
  const { data: workout, isLoading } = useQuery(
    ["workouts", props.workoutId],
    () => api.getWorkout(props.workoutId)
  );
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  if (isLoading) {
    return (
      <>
        <div
          onClick={() => {
            openModal();
          }}
          className="block m-10 max-w-xs p-3 bg-white border border-gray-100 rounded-lg hover:bg-gray-100"
        >
          <h1 className="font-bold font-sans pb-2">Loading...</h1>
          <p className="text-slate-600"></p>
        </div>
      </>
    );
  }

  return (
    <>
      <div
        onClick={() => {
          openModal();
        }}
        className="w-[48%] p-3 bg-white border border-gray-100 rounded-xl hover:bg-gray-100"
      >
        <h1 className="font-bold font-sans pb-2">{workout.name}</h1>
        {workout.exercises.allIds.map((exerciseId) => {
          return (
            <p
              key={exerciseId}
              className="text-slate-600"
            >{`${workout.exercises.byId[exerciseId].sets.length} x ${workout.exercises.byId[exerciseId].name}`}</p>
          );
        })}
        {/* <p className="text-slate-600">
          {workout.exercises.allIds.reduce((previewInfo, id, index) => {
            const { name, sets } = workout.exercises.byId[id];
            return index == 0
              ? `${sets.length} x ${name}`
              : `${previewInfo}, ${sets.length} x ${name}`;
          }, "")}
        </p> */}
      </div>
      <WorkoutModal
        closeModal={closeModal}
        isOpen={isOpen}
        workoutId={props.workoutId}
        workout={workout}
      />
    </>
  );
};

export default WorkoutPreviewCard;
