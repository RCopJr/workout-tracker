import React, { useMemo, useState } from "react";
import { useQuery } from "react-query";
import * as api from "../workoutsAPI";
import RoutineModal from "./RoutineModal";

const RoutinePreviewCard = (props) => {
  const { data, isLoading } = useQuery(["workouts", props.workoutId], () =>
    api.getWorkout(props.workoutId)
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
        <RoutineModal closeModal={closeModal} isOpen={isOpen} />
      </>
    );
  }
  const lenExercises = data.workout.exercises.length;

  return (
    <>
      <div
        onClick={() => {
          openModal();
        }}
        className="block m-10 max-w-xs p-3 bg-white border border-gray-100 rounded-lg hover:bg-gray-100"
      >
        <h1 className="font-bold font-sans pb-2">{data.workout.name}</h1>
        <p className="text-slate-600">
          {data.workout.exercises.reduce((previewInfo, currExercise, index) => {
            let separator = ", ";
            if (index === lenExercises - 1) {
              separator = "";
            }
            return (
              previewInfo +
              `${currExercise.sets.length} x ${currExercise.name}${separator}`
            );
          }, "")}
        </p>
      </div>
      <RoutineModal closeModal={closeModal} isOpen={isOpen} />
    </>
  );
};

export default RoutinePreviewCard;
