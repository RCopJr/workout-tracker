import React from "react";
import ExerciseHeading from "./ExerciseHeading";

const ExerciseEntry = (props) => {
  return (
    <>
      <div className="relative">
        <table className="w-full text-sm text-center text-gray-900 border-separate border-spacing-x-10">
          <thead className="text-lg">
            <tr>
              <th scope="col" className="py-1">
                Set
              </th>
              <th scope="col" className="py-1">
                lbs
              </th>
              <th scope="col" className="py-1">
                Reps
              </th>
              <th scope="col" className="py-1">
                Rest (s)
              </th>
            </tr>
          </thead>
          <tbody className="text-lg">
            <tr>
              <td className="py-3">
                <div className="font-extrabold m-auto bg-gray-200 rounded-lg flex justify-center">
                  1
                </div>
              </td>
              <td>
                <div className="font-extrabold m-auto bg-gray-200 rounded-lg flex justify-center">
                  35
                </div>
              </td>
              <td>
                <div className="font-extrabold m-auto bg-gray-200 rounded-lg flex justify-center">
                  10
                </div>
              </td>
              <td className="py-1">
                <div className="font-extrabold m-auto bg-gray-200 rounded-lg flex justify-center">
                  120
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ExerciseEntry;
