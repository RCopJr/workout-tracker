import React, { useMemo, useState } from "react";
import { useQuery } from "react-query";
import * as api from "../workoutsAPI";
import WorkoutModal from "./WorkoutModal";

const WorkoutPreviewCard = (props) => {
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
        <WorkoutModal closeModal={closeModal} isOpen={isOpen} />
      </>
    );
  }

  return (
    <>
      <div
        onClick={() => {
          openModal();
        }}
        className="block m-10 max-w-xs p-3 bg-white border border-gray-100 rounded-lg hover:bg-gray-100"
      >
        <h1 className="font-bold font-sans pb-2">{data.name}</h1>
        <p className="text-slate-600">
          {data.exercises.reduce((previewInfo, currExercise, index) => {
            const { sets, name } = currExercise;
            return index == 0
              ? `${sets.length} x ${name}`
              : `${previewInfo}, ${sets.length} x ${name}`;
          }, "")}
        </p>
      </div>
      <WorkoutModal
        closeModal={closeModal}
        isOpen={isOpen}
        workoutId={props.workoutId}
      />
    </>
  );
};

export default WorkoutPreviewCard;
