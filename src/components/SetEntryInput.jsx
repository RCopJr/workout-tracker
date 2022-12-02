import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Transition } from "@headlessui/react";
import React, { Fragment } from "react";

const SetEntry = (props) => {
  return (
    <>
      <div className="flex justify-between mt-4 gap-x-6">
        <div className="font-bold w-1/6 bg-gray-200 rounded-lg text-center">
          {props.setNum}
        </div>
        <div className="font-bold w-1/4 bg-gray-200 rounded-lg text-center">
          <input
            className="font-bold w-full bg-gray-200 rounded-lg text-center text-ellipsis placeholder-gray-900 focus:placeholder-gray-500"
            type="text"
            placeholder={props.weight}
          ></input>
        </div>
        <div className="font-bold w-1/4 bg-gray-200 rounded-lg text-center">
          <input
            className="font-bold w-full bg-gray-200 rounded-lg text-center text-ellipsis placeholder-gray-900 focus:placeholder-gray-500"
            type="text"
            placeholder={props.reps}
          ></input>
        </div>
        <div className="font-bold w-1/4 bg-gray-200 rounded-lg text-center">
          <input
            className="font-bold w-full bg-gray-200 rounded-lg text-center text-ellipsis placeholder-gray-900 focus:placeholder-gray-500"
            type="text"
            placeholder={props.rest}
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
