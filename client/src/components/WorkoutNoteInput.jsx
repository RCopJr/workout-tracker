import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

const WorkoutNoteInput = (props) => {
  return (
    <div className="text-md text-gray-500">
      <TextareaAutosize
        className="w-full"
        onChange={(event) => {
          props.handleWorkoutNote(event);
        }}
        value={props.note}
        placeholder="Notes..."
      />
    </div>
  );
};

export default WorkoutNoteInput;
