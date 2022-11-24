import {
  faEllipsis,
  faPen,
  faPencil,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

const ExerciseHeading = (props) => {
  return (
    <>
      <div className="flex max-w-xl justify-between items-center">
        <h1 className="font-bold text-sky-500">Bench Press (Barbell)</h1>
        <MyDropdown />
      </div>
    </>
  );
};

export default ExerciseHeading;

function MyDropdown() {
  return (
    <Menu as="div" className="relative inline-block">
      <Menu.Button className="bg-sky-100 px-2 rounded-md">
        <FontAwesomeIcon icon={faEllipsis} className="text-sky-500" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-300"
        enterFrom="transform opacity-0 scale-0"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-200"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-0"
      >
        <Menu.Items className="w-60 absolute right-0 mt-2 origin-top-right rounded-md bg-gray-800 text-white shadow-lg focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${
                  active && "bg-gray-700/60"
                } w-full rounded-t-md flex items-center px-3 py-1.5`}
              >
                <FontAwesomeIcon
                  icon={faPencil}
                  className="text-md mr-3 text-sky-400"
                />
                Rename
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
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
