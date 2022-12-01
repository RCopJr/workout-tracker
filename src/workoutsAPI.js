import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const getWorkouts = async () => {
  try {
    const response = await api.get("/workouts");
    return response.data;
  } catch (error) {
    throw new Error("Network response was not ok.");
  }
};

export const getWorkout = async (id) => {
  try {
    const response = await api.get(`/workouts/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Network response as not ok.");
  }
};
