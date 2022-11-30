import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Transition } from "@headlessui/react";
import React, { Fragment } from "react";

const SetEntry = (props) => {
  return (
    <>
      <div className="flex justify-between mt-4 gap-x-6">
        <div className="font-bold w-1/6 bg-gray-200 rounded-lg text-center">
          1
        </div>
        <div className="font-bold w-1/4 bg-gray-200 rounded-lg text-center">
          {props.inEditMode ? (
            <input
              className="font-bold w-full bg-gray-200 rounded-lg text-center text-ellipsis placeholder-gray-900 focus:placeholder-gray-500"
              type="text"
              placeholder="25"
            ></input>
          ) : (
            "25"
          )}
        </div>
        <div className="font-bold w-1/4 bg-gray-200 rounded-lg text-center">
          {props.inEditMode ? (
            <input
              className="font-bold w-full bg-gray-200 rounded-lg text-center text-ellipsis placeholder-gray-900 focus:placeholder-gray-500"
              type="text"
              placeholder="6-8"
            ></input>
          ) : (
            "6-8"
          )}
        </div>
        <div className="font-bold w-1/4 bg-gray-200 rounded-lg text-center">
          {props.inEditMode ? (
            <input
              className="font-bold w-full bg-gray-200 rounded-lg text-center text-ellipsis placeholder-gray-900 focus:placeholder-gray-500"
              type="text"
              placeholder="90"
            ></input>
          ) : (
            "90"
          )}
        </div>
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
          <div className="hover:bg-blue-800 font-bold w-1/12  bg-gray-200 rounded-md text-center flex items-center justify-center">
            <button type="button" className=" w-full rounded-md text-xs">
              <FontAwesomeIcon icon={faMinus} />
            </button>
          </div>
        </Transition>
      </div>
    </>
  );
};

export default SetEntry;
