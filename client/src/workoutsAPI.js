import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const getWorkouts = async () => {
  try {
    const response = await api.get("/workouts");
    return response.data;
  } catch (error) {
    throw new Error("Network response was not ok when getting workouts.");
  }
};

export const getWorkout = async (id) => {
  try {
    const response = await api.get(`/workouts/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Network response as not ok when getting workout by id.");
  }
};

export const updateWorkout = async (workout) => {
  try {
    const response = await api.put(`/workouts/${workout.id}`, {
      workout: workout,
    });
    return response.data;
  } catch (error) {
    throw new Error("Network response as not ok when updating workout.");
  }
};
