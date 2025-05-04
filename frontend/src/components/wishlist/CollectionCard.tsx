"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

interface CollectionCardProps {
  title: string;
  createdBy: string;
  lastUpdated: string;
  wishlist_id: string;
}

export const CollectionCard: React.FC<CollectionCardProps> = ({
  title,
  createdBy,
  lastUpdated,
  wishlist_id,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/wishlist/${wishlist_id}`); // ✅ fixed here
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 m-4 text-gray-800 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <h1
          className="text-xl hover:text-2xl font-semibold truncate cursor-pointer"
          onClick={handleClick}
        >
          {title}
        </h1>
        <div className="flex space-x-2">
          <button
            className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            aria-label="Edit"
          >
            <FaEdit className="h-5 w-5" />
          </button>
          <button
            className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            aria-label="Delete"
          >
            <MdDelete className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-sm text-gray-700">
          <span className="font-medium">Wishlist ID:</span> {wishlist_id}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-medium">Created by:</span> {createdBy}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-medium">Last updated:</span> {lastUpdated}
        </p>
      </div>
    </div>
  );
};
