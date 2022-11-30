import { Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import ExerciseHeading from "./ExerciseHeading";

const ExerciseDataHeader = (props) => {
  return (
    <>
      <div className="flex justify-between mt-5 gap-x-6">
        <div className="font-extrabold w-1/6 text-center">Set</div>
        <div className="font-extrabold w-1/4 text-center">lbs</div>
        <div className="font-extrabold w-1/4 text-center">Reps</div>
        <div className="font-extrabold w-1/4 text-center">Rest</div>
        <Transition
          appear
          show={props.inEditMode}
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="font-extrabold w-1/12 text-center"></div>
        </Transition>
      </div>
    </>
  );
};

export default ExerciseDataHeader;
