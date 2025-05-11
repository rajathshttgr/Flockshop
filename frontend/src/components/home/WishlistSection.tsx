"use client";
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { FaRegHeart } from "react-icons/fa";
import { MdLibraryAdd } from "react-icons/md";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const WishlistSection = () => {
  const router = useRouter();
  const [wishlists, setWishlists] = React.useState<{
    data: { id: string; wishlist_id: string; name: string }[];
  } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token not found in localStorage");
      return;
    }

    const decoded = jwtDecode<{ username: string }>(token);
    const username = decoded.username;

    // const username="rajath991";
    const fetchWishlists = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/wishlist/wishlists/${username}`
        );

        setWishlists(response.data);
      } catch (error) {
        console.error("Error fetching wishlists:", error);
      }
    };

    fetchWishlists();
  }, []);

  return (
    <div className="flex items-center justify-center mt-22 md:px-32 px-4">
      {/* My Wishlists Button */}
      <div className="flex-shrink-0 mx-4">
        <p
          className="flex items-center justify-center p-2 px-4 h-15 rounded-lg bg-amber-300 shadow-lg cursor-pointer hover:bg-amber-400 transition duration-300 ease-in-out whitespace-nowrap"
          onClick={() => router.push("/wishlist")}
        >
          <MdLibraryAdd className="h-6 w-6 mr-2" /> My Wishlist
        </p>
      </div>

      {/* Divider */}
      <div className="border-l-2 border-gray-300 h-20 mx-4"></div>

      {/* Scrollable Wishlist Items */}
      <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
        {wishlists?.data?.map((wishlist) => (
          <div
            key={wishlist.id}
            className="flex flex-col items-center flex-shrink-0"
          >
            <div
              className="bg-gray-100 h-15 w-15 text-center flex items-center justify-center rounded-md shadow-md cursor-pointer hover:bg-gray-200 transition duration-300 ease-in-out"
              onClick={() => router.push(`/wishlist/${wishlist.wishlist_id}`)}
            >
              <FaRegHeart className="h-6 w-6" />
            </div>
            <p className="p-1 flex items-center text-gray-600 text-sm">
              {wishlist.name.length > 10
                ? `${wishlist.name.slice(0, 8)}...`
                : wishlist.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
