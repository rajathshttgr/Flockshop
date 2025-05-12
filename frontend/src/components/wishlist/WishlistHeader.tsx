"use client";
import React from "react";

type Props = {
  listname: string;
  listid: string;
  createdBy: string;
  isNewUser: boolean | null;
  isFollow: string;
  totalProducts: number;
  onFollowClick: () => void;
  onShareClick: () => void;
};

const WishlistHeader: React.FC<Props> = ({
  listname,
  listid,
  createdBy,
  isNewUser,
  isFollow,
  totalProducts,
  onFollowClick,
  onShareClick,
}) => {
  return (
    <div className="pt-24">
      <h1 className="text-3xl font-bold text-gray-800 text-center">
        {listname}
      </h1>
      <p className="text-center text-gray-600">
        Wishlist ID: <span className="font-mono text-gray-800">{listid}</span>
      </p>

      <div className="flex justify-between border-b-2 border-gray-300 mt-4 mb-6 m-4">
        {isNewUser === null ? (
          <div />
        ) : isNewUser ? (
          <div className="flex gap-4">
            <button
              className="ml-2 m-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition cursor-pointer"
              onClick={onFollowClick}
            >
              {isFollow}
            </button>
            <button
              className="cursor-pointer px-4 py-2 m-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
              onClick={onShareClick}
            >
              Share
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            <button
              className="cursor-pointer px-4 py-2 m-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
              onClick={onShareClick}
            >
              Share
            </button>
            <button className="cursor-pointer px-4 py-2 m-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition">
              Edit
            </button>
          </div>
        )}

        <div className="flex gap-4 items-center">
          <p className="text-gray-600">
            Total Products:{" "}
            <span className="font-bold text-gray-800">{totalProducts}</span>
          </p>
          <p className="text-gray-600">
            Created by:{" "}
            <span className="font-bold text-gray-800">{`${createdBy}${
              isNewUser === false ? " (you)" : ""
            }`}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WishlistHeader;
