import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const getWorkouts = async () => {
  try {
    console.log("in request");
    const response = await api.get("/workouts");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("error");
  }
};

export const getWorkout = async (id) => {
  try {
    const response = await api.get(`/workouts/${id}`);
    return response.data;
  } catch (error) {
    console.log("error");
  }
};
