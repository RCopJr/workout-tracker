import React from "react";

const BtnSolid = (props) => {
  let bgColor = "bg-sky-200";
  let padding = "py-1";
  let textColor = "";

  if (props.variant === "gray-sm") {
    bgColor = "bg-gray-200";
    padding = "py-0";
  } else if (props.variant === "red-light") {
    bgColor = "bg-red-200";
    padding = "py-1";
    textColor = "text-red-600";
  } else if (props.variant === "blue-light") {
    bgColor = "bg-sky-200";
    padding = "py-1";
    textColor = "text-sky-600";
  } else if (props.variant == "blue-dark") {
    bgColor = "bg-sky-500";
    padding = "py-1";
    textColor = "text-white";
  }

  return (
    <button
      type="button"
      className={`${bgColor} hover:bg-blue-800 w-full ${padding} rounded-lg`}
      onClick={(event) => {
        props.onClick.apply(null, [event, ...props.arguments]);
      }}
    >
      <span className={`font-bold ${textColor}`}>{props.text}</span>
    </button>
  );
};

export default BtnSolid;
