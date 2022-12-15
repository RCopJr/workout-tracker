import React from "react";

const WorkoutTitleInput = (props) => {
  return (
    <input
      type="text"
      onChange={(event) => {
        props.handleChangeWorkoutTitle(event);
      }}
      className="font-extrabold text-lg text-center"
      placeholder={"Name..."}
      value={props.name}
    />
  );
};

export default WorkoutTitleInput;
