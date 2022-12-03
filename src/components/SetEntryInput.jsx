import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const SetEntry = (props) => {
  const [userInput, setUserInput] = useState({
    weight: props.weight,
    reps: props.reps,
    rest: props.rest,
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const newVal = e.target.value;

    setUserInput((prevInput) => {
      return { ...prevInput, [name]: newVal };
    });
  };

  return (
    <>
      <div className="flex justify-between mt-4 gap-x-6">
        <div className="font-bold w-1/6 bg-gray-200 rounded-lg text-center">
          {props.setNum}
        </div>
        <div className="font-bold w-1/4 bg-gray-200 rounded-lg text-center">
          <input
            className="font-bold w-full bg-gray-200 rounded-lg text-center text-ellipsis placeholder-gray-900 focus:placeholder-gray-500"
            onChange={handleChange}
            name="weight"
            type="text"
            placeholder={props.weight}
            value={userInput.weight}
          ></input>
        </div>
        <div className="font-bold w-1/4 bg-gray-200 rounded-lg text-center">
          <input
            className="font-bold w-full bg-gray-200 rounded-lg text-center text-ellipsis placeholder-gray-900 focus:placeholder-gray-500"
            onChange={handleChange}
            name="reps"
            type="text"
            placeholder={props.reps}
            value={userInput.reps}
          ></input>
        </div>
        <div className="font-bold w-1/4 bg-gray-200 rounded-lg text-center">
          <input
            className="font-bold w-full bg-gray-200 rounded-lg text-center text-ellipsis placeholder-gray-900 focus:placeholder-gray-500"
            onChange={handleChange}
            name="rest"
            type="text"
            placeholder={props.rest}
            value={userInput.rest}
          ></input>
        </div>
        <div className="hover:bg-blue-800 font-bold w-1/12  bg-gray-200 rounded-md text-center flex items-center justify-center">
          <button type="button" className=" w-full rounded-md text-xs">
            <FontAwesomeIcon icon={faMinus} />
          </button>
        </div>
      </div>
    </>
  );
};

export default SetEntry;
