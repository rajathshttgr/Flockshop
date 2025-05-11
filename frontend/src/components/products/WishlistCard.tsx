"use client";
import React from "react";
import { BsPeopleFill } from "react-icons/bs";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { FaLock } from "react-icons/fa";

type CollectionCardProps = {
  type: string;
  name: string;
  wishlist_id: string;
  selectedWishlistId: string;
  onSelectWishlist: (wishlistId: string) => void;
};

const WishlistCard: React.FC<CollectionCardProps> = ({
  type,
  name,
  wishlist_id,
  selectedWishlistId,
  onSelectWishlist,
}) => {
  const isSelected = wishlist_id === selectedWishlistId;

  // Override type if selected
  const cardType = isSelected ? "selected" : type;

  return (
    <div
      className={`flex items-center h-14 w-96 m-1 border-2 rounded-md overflow-hidden shadow-sm transition-shadow duration-300 cursor-pointer ${
        isSelected ? "bg-amber-100 border-amber-400" : "border-gray-200"
      }`}
      onClick={() => onSelectWishlist(wishlist_id)}
    >
      <div className="flex items-center justify-center bg-amber-300 h-full w-14">
        {cardType === "private" ? (
          <FaLock className="text-2xl text-white" />
        ) : cardType === "public" ? (
          <BsPeopleFill className="text-2xl text-white" />
        ) : (
          <IoCheckmarkDoneCircleOutline className="text-2xl text-white" />
        )}
      </div>
      <div className="flex-1 px-4 text-gray-800 font-medium h-full flex items-center justify-center">
        {name}
      </div>
    </div>
  );
};

export default WishlistCard;
