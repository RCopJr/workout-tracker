import React, { useState } from "react";
import RoutineModal from "./RoutineModal";

const RoutinePreviewCard = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div
        onClick={() => {
          openModal();
        }}
        className="block m-10 max-w-xs p-3 bg-white border border-gray-100 rounded-lg hover:bg-gray-100"
      >
        <h1 className="font-bold font-sans pb-2">Legs</h1>
        <p className="text-slate-600">Squat and Leg Extension</p>
      </div>
      <RoutineModal closeModal={closeModal} isOpen={isOpen} />
    </>
  );
};

export default RoutinePreviewCard;
