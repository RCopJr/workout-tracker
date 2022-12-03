import { Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import ExerciseDropdown from "./ExerciseDropdown";

const ExerciseHeadingInput = (props) => {
  const [userInput, setUserInput] = useState("");
  const handleChange = (e) => {
    const newVal = e.target.value;
    setUserInput(newVal);
  };
  return (
    <div className="mt-5 flex max-w-xl justify-between items-center">
      <div className="flex-1">
        <h1 className="font-bold text-sky-500">
          <input
            type="text"
            onChange={handleChange}
            className="font-bold text-sky-500 w-full"
            placeholder={props.name ? props.name : "New Exercise"}
            value={userInput}
          ></input>
        </h1>
      </div>
      <div>
        <ExerciseDropdown
          exerciseId={props.exerciseId}
          handleRemoveExercise={props.handleRemoveExercise}
        />
      </div>
    </div>
  );
};

export default ExerciseHeadingInput;
