import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import * as api from "../../workoutsAPI";
import BtnSolid from "../BtnSolid";
import WorkoutPreviewCard from "./WorkoutPreviewCard";

const Workouts = (props) => {
  const {
    data: workouts,
    isLoading,
    isError,
  } = useQuery("workouts", api.getWorkouts, {
    refetchOnWindowFocus: false,
  });

  const queryClient = useQueryClient();

  const { isLoading: isLoadingMutation, mutate } = useMutation(
    api.createWorkout,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("workouts");
      },
    }
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isLoadingMutation) {
    return <p>Creating Workout...</p>;
  }

  if (isError) {
    return <p>Error Getting Data</p>;
  }

  const handleCreateWorkout = (event) => {
    mutate();
  };
  return (
    <div className="flex flex-col justify-center items-center p-4">
      <div className="w-full">
        <BtnSolid
          variant="blue-dark"
          text="Create Workout"
          onClick={handleCreateWorkout}
          arguments={[]}
        />
      </div>
      <div className="flex flex-wrap gap-3 justify-between mt-5 w-full">
        {workouts.allIds.map((workoutId) => {
          return (
            <WorkoutPreviewCard
              key={workoutId}
              workoutId={workoutId}
              allWorkoutIds={workouts.allIds}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Workouts;
