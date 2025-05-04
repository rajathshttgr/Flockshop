import React from "react";
import { FaCartShopping } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";

export const Header = () => {
  return (
    <div className="fixed top-0 z-50 flex w-full h-20 bg-gray-800 text-white items-center justify-between sm:px-40 sm:pr-60 px-4 shadow-2xl">
      <div className="sm:text-2xl text-xl font-bold px-4">FlockSHOP</div>
      <div className="flex justify-between h-10 w-full bg-gray-200 items-center rounded-md">
        <div className="flex-grow">
          <input
            type="text"
            className="border-none h-9 p-4 text-black w-full"
            placeholder="Search something..."
          />
        </div>
        <div className="bg-amber-400 h-10 w-10 flex items-center justify-center cursor-pointer hover:bg-amber-500 transition duration-300 ease-in-out rounded-r-md">
          <IoSearch />
        </div>
      </div>
      <div className="px-4">
        <FaCartShopping className="h-10 w-10" />
      </div>
    </div>
  );
};
