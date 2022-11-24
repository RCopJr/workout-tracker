import React from "react";

const Card = (props) => {
  return (
    <div className="block m-10 max-w-xs p-3 bg-white border border-gray-100 rounded-lg hover:bg-gray-100">
      <h1 className="font-bold font-sans pb-2">Legs</h1>
      <p className="text-slate-600">3 x Squat (Barbell)</p>
      <p className="text-slate-600">3 x Leg Extension (Machine)</p>
      <p className="text-slate-600">3 x Flat Leg Raise</p>
    </div>
  );
};

export default Card;
