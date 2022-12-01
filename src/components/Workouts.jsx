import React from "react";
import { useQuery } from "react-query";
import * as api from "../workoutsAPI";
import RoutinePreviewCard from "./RoutinePreviewCard";

const Workouts = (props) => {
  const { data, isLoading } = useQuery("workouts", api.getWorkouts);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {data.workouts.map((workout) => {
        return <RoutinePreviewCard key={workout.id} workoutId={workout.id} />;
      })}
    </>
  );
};

export default Workouts;
