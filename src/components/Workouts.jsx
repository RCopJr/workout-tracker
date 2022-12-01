import React from "react";
import { isError, useQuery } from "react-query";
import * as api from "../workoutsAPI";
import RoutinePreviewCard from "./RoutinePreviewCard";

const Workouts = (props) => {
  const { data, isLoading, isError } = useQuery("workouts", api.getWorkouts);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error Getting Data</p>;
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
