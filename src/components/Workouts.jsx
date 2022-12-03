import React from "react";
import { useQuery } from "react-query";
import { v4 as uuidv4 } from "uuid";
import * as api from "../workoutsAPI";
import WorkoutPreviewCard from "./WorkoutPreviewCard";

const Workouts = (props) => {
  const { data, isLoading, isError } = useQuery("workouts", api.getWorkouts, {
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error Getting Data</p>;
  }
  return (
    <>
      {data.workouts.map((workout) => {
        const id = uuidv4();
        return <WorkoutPreviewCard key={id} workoutId={workout.id} />;
      })}
    </>
  );
};

export default Workouts;
