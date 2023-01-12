const normalizeWorkouts = (workouts) => {
  let normalizedWorkouts = { byId: {}, allIds: [] };

  workouts.forEach((workout) => {
    const { _id: workoutId } = workout;
    const normalizedWorkout = normalizeWorkout(workout);
    normalizedWorkouts.byId[workoutId] = normalizedWorkout;
    normalizedWorkouts.allIds.push(workoutId);
  });

  return normalizedWorkouts;
};

const normalizeWorkout = (workout) => {
  const { _id: workoutId, name, note, exercises } = workout;
  const normalizedWorkout = {
    id: workoutId,
    name: name,
    note: note,
    exercises: {},
    sets: {},
  };
  let normalizedExercises = { byId: {}, allIds: [] };
  let normalizedSets = {};
  exercises.forEach((exercise) => {
    const { _id: exerciseId, sets, name } = exercise;
    normalizedExercises.byId[exerciseId] = {
      id: exerciseId,
      name: name,
      sets: [],
    };
    normalizedExercises.allIds.push(exerciseId);
    sets.forEach((set) => {
      const { _id: setId, weight, reps, rest } = set;
      normalizedSets[setId] = {
        weight: weight,
        reps: reps,
        rest: rest,
      };
      normalizedExercises.byId[exerciseId].sets.push(setId);
    });
  });

  normalizedWorkout.exercises = normalizedExercises;
  normalizedWorkout.sets = normalizedSets;

  return normalizedWorkout;
};

module.exports = {
  normalizeWorkout: normalizeWorkout,
  normalizeWorkouts: normalizeWorkouts,
};
