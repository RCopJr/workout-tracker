import React from "react";

const BtnSolid = (props) => {
  let bgColor = "bg-sky-200";
  let padding = "py-2";
  let textColor = "";

  if (props.variant === "gray-sm") {
    bgColor = "bg-gray-200";
    padding = "py-0";
  } else if (props.variant === "red-light") {
    bgColor = "bg-red-200";
    padding = "py-2";
    textColor = "text-red-500";
  }

  return (
    <button
      type="button"
      className={`${bgColor} hover:bg-blue-800 w-full ${padding} rounded-lg`}
      onClick={(event) => {
        props.handleClick(event);
      }}
    >
      <span className={`font-bold ${textColor}`}>{props.text}</span>
    </button>
  );
};

export default BtnSolid;
