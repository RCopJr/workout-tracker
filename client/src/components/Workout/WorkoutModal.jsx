import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import WorkoutUpdateForm from "./WorkoutUpdateForm";
import WorkoutView from "./WorkoutView";

const WorkoutModal = (props) => {
  const [inEditMode, setInEditMode] = useState(false);

  return (
    <>
      <Transition appear show={props.isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            props.closeModal();
            setInEditMode(false);
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
                  {inEditMode ? (
                    <WorkoutUpdateForm
                      isOpen={props.isOpen}
                      closeModal={props.closeModal}
                      inEditMode={inEditMode}
                      setInEditMode={setInEditMode}
                      workoutId={props.workoutId}
                      workout={props.workout}
                      allWorkoutIds={props.allWorkoutIds}
                    />
                  ) : (
                    <WorkoutView
                      isOpen={props.isOpen}
                      closeModal={props.closeModal}
                      inEditMode={inEditMode}
                      setInEditMode={setInEditMode}
                      workoutId={props.workoutId}
                      workout={props.workout}
                    />
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default WorkoutModal;
