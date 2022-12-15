import {
  faArrowDown,
  faArrowUp,
  faEllipsis,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

function ExerciseDropdown(props) {
  return (
    <Menu as="div" className="relative inline-block">
      <Menu.Button className="bg-sky-100 px-2 rounded-md">
        <FontAwesomeIcon icon={faEllipsis} className="text-sky-500" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="ease-out duration-200"
        enterFrom="opacity-0 scale-0"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-0"
      >
        <Menu.Items className="z-20 w-60 absolute right-0 mt-2 origin-top-right rounded-md bg-gray-800 text-white shadow-lg focus:outline-none">
          {!props.isFirstExercise && (
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={(event) => {
                    props.handleMoveExerciseUp(event, props.exerciseId);
                  }}
                  className={`${
                    active && "bg-gray-700/60"
                  } w-full rounded-b-md flex items-center px-3 py-1.5`}
                >
                  <FontAwesomeIcon
                    icon={faArrowUp}
                    className="text-xl mr-4 text-sky-500"
                  />
                  Move Up
                </button>
              )}
            </Menu.Item>
          )}

          {!props.isLastExercise && (
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={(event) => {
                    props.handleMoveExerciseDown(event, props.exerciseId);
                  }}
                  className={`${
                    active && "bg-gray-700/60"
                  } w-full rounded-b-md flex items-center px-3 py-1.5`}
                >
                  <FontAwesomeIcon
                    icon={faArrowDown}
                    className="text-xl mr-4 text-sky-500"
                  />
                  Move Down
                </button>
              )}
            </Menu.Item>
          )}
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={(event) => {
                  props.handleRemoveExercise(event, props.exerciseId);
                }}
                className={`${
                  active && "bg-gray-700/60"
                } w-full rounded-b-md flex items-center px-3 py-1.5`}
              >
                <FontAwesomeIcon
                  icon={faXmark}
                  className="text-xl mr-4 text-red-500"
                />
                Remove Exercise
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default ExerciseDropdown;
