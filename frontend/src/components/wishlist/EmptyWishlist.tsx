import React from "react";
import { NewCollectionButton } from "./NewCollectionButton";

export const EmptyWishlist = () => {
  return (
    <div>
      {" "}
      <div className="flex flex-col justify-center items-center h-96 text-center">
        <div className="flex flex-col items-center justify-center flex-grow">
          <h1 className="text-3xl font-bold text-gray-800 mt-6">
            Your Wishlist is empty
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Add items to your wishlist to keep track of what you love.
          </p>
          <NewCollectionButton />
        </div>
      </div>
    </div>
  );
};
