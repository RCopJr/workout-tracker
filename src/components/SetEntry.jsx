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
          {props.weight}
        </div>
        <div className="font-bold w-1/4 bg-gray-200 rounded-lg text-center">
          {props.reps}
        </div>
        <div className="font-bold w-1/4 bg-gray-200 rounded-lg text-center">
          {props.rest}
        </div>
      </div>
    </>
  );
};

export default SetEntry;
