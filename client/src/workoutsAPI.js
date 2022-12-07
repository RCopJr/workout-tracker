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

export const createWorkout = async () => {
  try {
    const response = await api.post(`/workouts`);
    return response.data;
  } catch (error) {
    throw new Error("Network response as not ok when creating workout.");
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

export const deleteWorkout = async (id) => {
  try {
    const response = await api.delete(`/workouts/${workout.id}`);
    return response.data;
  } catch (error) {
    throw new Error("Network response as not ok when deleting workout.");
  }
};
