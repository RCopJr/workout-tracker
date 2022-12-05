import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

const WorkoutNoteInput = (props) => {
  const [userInput, setUserInput] = useState("");
  const handleChange = (e) => {
    const newVal = e.target.value;
    setUserInput(newVal);
  };
  return (
    <div className="text-md text-gray-500">
      <TextareaAutosize
        onChange={handleChange}
        value={userInput}
        placeholder="text here"
      />
    </div>
  );
};

export default WorkoutNoteInput;
