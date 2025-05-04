import React from "react";

export const MilestoneBoard = () => {
  return (
    <div className="p-6 mt-10">
      <div>
        <div className="font-extrabold text-gray-700 sm:text-6xl text-5xl sm:pl-16 pl-6">
          <p>Explore millions of offerings</p>
          <p>tailored to your fashion needs</p>
        </div>
      </div>
      <div className="flex md:flex-row flex-col items-center justify-center">
        <div className="text-center  p-2 mt-4 flex flex-col items-center justify-center mr-10">
          <h1 className="text-amber-300 font-extrabold text-7xl">200M+</h1>
          <p className="text-xl p-2 font-medium text-gray-800">
            orderes so far
          </p>
        </div>
        <div className="text-center  p-2 mt-4 flex flex-col items-center justify-center mr-10">
          <h1 className="text-amber-300 font-extrabold text-7xl">200+</h1>
          <p className="text-xl p-2 font-medium text-gray-800">
            product categories
          </p>
        </div>
        <div className="text-center  m-1 p-2 mt-4 flex flex-col items-center justify-center">
          <h1 className="text-amber-300 font-extrabold text-7xl">600K+</h1>
          <p className="text-xl p-2 font-medium text-gray-800">products</p>
        </div>
      </div>
    </div>
  );
};
