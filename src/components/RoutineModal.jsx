import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import ExerciseEntry from "./ExerciseEntry";
import ExerciseHeading from "./ExerciseHeading";

const RoutineModal = (props) => {
  return (
    <>
      <Transition appear show={props.isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={props.closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                      className="flex items-center bg-gray-300 rounded-md px-2 py-1 focus:outline-none"
                      onClick={props.closeModal}
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                    <Dialog.Title as="h2" className="font-medium text-lg">
                      Legs
                    </Dialog.Title>
                    <button className="text-blue-400 text-lg">Edit</button>
                  </div>
                  <div className="mt-2">
                    <p className="text-md text-gray-500">
                      Insert notes about routine here
                    </p>
                  </div>
                  <ExerciseHeading />
                  <ExerciseEntry />

                  {/* <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={props.closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div> */}
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
