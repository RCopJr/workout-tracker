import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import BtnSolid from "./BtnSolid";
import ExerciseDataHeader from "./ExerciseDataHeader";
import ExerciseHeading from "./ExerciseHeading";
import SetEntry from "./SetEntry";

const RoutineModal = (props) => {
  const [inEditMode, setInEditMode] = useState(false);

  return (
    <>
      <Transition appear show={props.isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setInEditMode(false);
            props.closeModal();
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl overflow-hidden rounded-2xl bg-white p-4 text-left shadow-xl">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      className="flex items-center bg-gray-200 rounded-md px-2 py-1 focus:outline-none"
                      onClick={() => {
                        setInEditMode(false);
                        props.closeModal();
                      }}
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                    <Dialog.Title as="h2" className="font-extrabold text-lg">
                      Legs
                    </Dialog.Title>
                    {inEditMode ? (
                      <button
                        className="text-blue-400 text-lg"
                        onClick={() => {
                          setInEditMode(false);
                        }}
                      >
                        View
                      </button>
                    ) : (
                      <button
                        className="text-blue-400 text-lg"
                        onClick={() => {
                          setInEditMode(true);
                        }}
                      >
                        Edit
                      </button>
                    )}
                  </div>
                  <div className="mt-3">
                    {inEditMode ? (
                      <input
                        type="text"
                        className="text-md text-gray-500 w-full"
                        placeholder="Insert notes about routine here"
                      ></input>
                    ) : (
                      <p className="text-md text-gray-500">
                        Insert notes about routine here
                      </p>
                    )}
                  </div>
                  <ExerciseHeading inEditMode={inEditMode} />
                  <ExerciseDataHeader inEditMode={inEditMode} />
                  <SetEntry inEditMode={inEditMode} />
                  <SetEntry inEditMode={inEditMode} />
                  <Transition
                    appear
                    show={inEditMode}
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="mt-5 flex justify-center gap-3">
                      <BtnSolid variant="gray-sm" text="+ Add Set" />
                      <BtnSolid variant="gray-sm" text="+ Duplicate Set" />
                    </div>
                  </Transition>
                  <ExerciseHeading inEditMode={inEditMode} />
                  <ExerciseDataHeader inEditMode={inEditMode} />
                  <SetEntry inEditMode={inEditMode} />
                  <SetEntry inEditMode={inEditMode} />
                  <Transition
                    appear
                    show={inEditMode}
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="mt-5 flex justify-center gap-3">
                      <BtnSolid variant="gray-sm" text="+ Add Set" />
                      <BtnSolid variant="gray-sm" text="+ Duplicate Set" />
                    </div>
                  </Transition>
                  <Transition
                    appear
                    show={inEditMode}
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="mt-8 flex justify-center">
                      <BtnSolid variant="blue-light" text="Add Exercise" />
                    </div>
                  </Transition>

                  <Transition
                    appear
                    show={inEditMode}
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="mt-8 flex justify-center">
                      <BtnSolid variant="blue-dark" text="Save" />
                    </div>
                  </Transition>
                  <Transition
                    appear
                    show={inEditMode}
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="mt-8 flex justify-center">
                      <BtnSolid variant="red-light" text="Delete Workout" />
                    </div>
                  </Transition>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default RoutineModal;
