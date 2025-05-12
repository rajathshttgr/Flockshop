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
    router.push(`/wishlist/${wishlist_id}`);
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 mb-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div>
          <h2
            onClick={handleClick}
            className="text-2xl font-semibold text-gray-900 cursor-pointer hover:text-indigo-600 transition-colors"
          >
            {title}
          </h2>
          <p className="text-sm text-gray-500">ID: {wishlist_id}</p>
        </div>
        <div className="flex gap-2">
          <button
            className="p-2 rounded-lg bg-gray-100 hover:bg-indigo-100 text-gray-600 hover:text-indigo-600 transition-colors"
            aria-label="Edit"
          >
            <FaEdit className="h-4 w-4" />
          </button>
          <button
            className="p-2 rounded-lg bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 transition-colors"
            aria-label="Delete"
          >
            <MdDelete className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="text-sm text-gray-700 space-y-1">
        <p>
          <span className="font-medium text-gray-600">Created by:</span>{" "}
          {createdBy}
        </p>
        <p>
          <span className="font-medium text-gray-600">Last updated:</span>{" "}
          {lastUpdated}
        </p>
      </div>
    </div>
  );
};
