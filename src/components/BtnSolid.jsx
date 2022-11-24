import React from "react";

const BtnSolid = (props) => {
  return (
    <button
      type="button"
      className="text-white bg-sky-500 hover:bg-blue-800 px-28 py-2 rounded-lg border"
      onClick={(event) => {
        props.handleClick(event);
      }}
    >
      <span className="font-bold">Start an Empty Workout</span>
    </button>
  );
};

export default BtnSolid;
