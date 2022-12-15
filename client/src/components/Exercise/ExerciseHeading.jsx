import React from "react";

const ExerciseHeading = (props) => {
  return (
    <div className="mt-5 flex max-w-xl justify-between items-center">
      <div className="flex-1">
        <h1 className="font-bold text-sky-500">
          <p className="text-ellipsis">{props.name}</p>
        </h1>
      </div>
    </div>
  );
};

export default ExerciseHeading;
