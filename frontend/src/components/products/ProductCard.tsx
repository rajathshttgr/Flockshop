"use client";
import React from "react";
import { MdLibraryAdd } from "react-icons/md";

type ProductCardProps = {
  name: string;
  price: string;
  imageUrl?: string;
  productId: string;
  onAddToWishlist: (productId: string) => void;
};

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  imageUrl,
  productId,
  onAddToWishlist,
}) => {
  return (
    <div className="flex flex-col items-center justify-between h-full p-4 bg-gray-200 rounded-md">
      <div
        className="w-full h-36 bg-gray-50 rounded-md bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <p className="text-2xl font-bold text-gray-800 mt-2">{name}</p>
      <p className="text-lg text-gray-600">${price}</p>
      <button
        onClick={() => onAddToWishlist(productId)}
        className="flex items-center justify-center mt-auto bg-amber-400 text-white px-4 py-2 rounded-md hover:bg-amber-500 transition duration-500 ease-in-out cursor-pointer"
      >
        <MdLibraryAdd className="mr-2" />
        Add to Wishlist
      </button>
    </div>
  );
};

export default ProductCard;
