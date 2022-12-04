import React, { useState } from "react";

const WorkoutNoteInput = (props) => {
  const [userInput, setUserInput] = useState("");
  const handleChange = (e) => {
    const newVal = e.target.value;
    setUserInput(newVal);
  };
  return (
    <textarea
      className="text-md text-gray-500"
      onChange={handleChange}
      placeholder={props.note}
      value={userInput}
    />
  );
};

export default WorkoutNoteInput;
