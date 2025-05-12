"use client";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import Image from "next/image";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import toast from "react-hot-toast";

type ProductCardProps = {
  name: string;
  price: string;
  image_url?: string;
  product_id?: string;
  added_by?: string;
  listid: string;
};

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  image_url,
  product_id,
  added_by,
  listid,
}) => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode<{ username: string }>(token);
      setUsername(decoded.username);
    }
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/wishlist/products/${listid}/${product_id}`
      );
      toast.success("Product removed from wishlist!");
      window.location.reload();
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove product.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-between h-full p-4 bg-gray-200 rounded-md">
      <div className="w-full h-36 bg-gray-50 rounded-md relative overflow-hidden">
        {image_url ? (
          <Image
            src={image_url}
            alt={name}
            fill
            className="object-cover rounded-md"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-400">
            No Image Available
          </div>
        )}
      </div>

      <div className="flex justify-between items-center w-full mt-2">
        <p className="text-2xl font-bold text-gray-800 mt-2">{name}</p>
        <div className="relative mt-2">
          <button
            className="px-2 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
            onClick={(e) => {
              const dropdown = e.currentTarget.nextElementSibling;
              if (dropdown) dropdown.classList.toggle("hidden");
            }}
          >
            <FaRegHeart />
          </button>
          <div className="absolute left-0 mt-2 w-10 bg-white border border-gray-300 rounded-md shadow-lg hidden">
            {["😀", "😍", "😎", "😢", "🎉"].map((emoji) => (
              <button
                key={emoji}
                className="w-full px-2 py-1 text-left hover:bg-gray-100"
                onClick={(e) => {
                  const emojiContainer =
                    e.currentTarget.parentElement?.previousElementSibling;
                  if (emojiContainer) emojiContainer.textContent = emoji;
                  e.currentTarget.parentElement?.classList.add("hidden");
                }}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="text-lg text-gray-600">{price}</p>

      <button
        onClick={handleDelete}
        className="flex items-center justify-center mt-auto bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition cursor-pointer"
      >
        <MdDelete className="mr-2" />
        Remove from Wishlist
      </button>

      <div className="mt-2 text-sm text-gray-500">
        <span>
          Added by{" "}
          <span className="font-bold text-gray-800">
            {added_by === username ? "you" : added_by}
          </span>
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
