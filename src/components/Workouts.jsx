import React from "react";
import { useQuery } from "react-query";
import * as api from "../workoutsAPI";
import WorkoutPreviewCard from "./WorkoutPreviewCard";

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
        return <WorkoutPreviewCard key={workout.id} workoutId={workout.id} />;
      })}
    </>
  );
};

export default Workouts;
