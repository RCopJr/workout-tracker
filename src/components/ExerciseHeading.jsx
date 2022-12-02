import { Transition } from "@headlessui/react";
import React, { Fragment } from "react";
const ExerciseHeading = (props) => {
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
            <p className="text-ellipsis">{props.name}</p>
          </h1>
        </div>
      </div>
    </Transition>
  );
};

export default ExerciseHeading;
