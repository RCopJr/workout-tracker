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
    <Transition
      appear
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="mt-5 flex max-w-xl justify-between items-center">
        <div className="flex-1">
          <h1 className="font-bold text-sky-500">
            <input
              type="text"
              onChange={handleChange}
              className="font-bold text-sky-500 w-full"
              placeholder={props.name}
              value={userInput}
            ></input>
          </h1>
        </div>
        <div>
          <ExerciseDropdown />
        </div>
      </div>
    </Transition>
  );
};

export default ExerciseHeadingInput;
