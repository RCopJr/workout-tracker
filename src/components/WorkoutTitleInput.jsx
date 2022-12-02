import React, { useState } from "react";

const WorkoutTitleInput = (props) => {
  const [userInput, setUserInput] = useState("");
  const handleChange = (e) => {
    const newVal = e.target.value;
    setUserInput(newVal);
  };
  return (
    <input
      type="text"
      onChange={handleChange}
      className="font-extrabold text-lg text-center"
      placeholder={props.name}
      value={userInput}
    />
  );
};

export default WorkoutTitleInput;
