"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import { Footer } from "@/components/layouts/Footer";
import { NewCollectionButton } from "@/components/wishlist/NewCollectionButton";
import { CollectionCard } from "@/components/wishlist/CollectionCard";
import { IoMdMenu } from "react-icons/io";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Page = () => {
  const isEmpty = false; // Replace with your logic to check if the wishlist is empty
  const [showMenu, setShowMenu] = useState(false);

  interface DecodedToken {
    username: string;
  }

  const [wishlists, setWishlists] = useState([]);

  useEffect(() => {
    const fetchWishlists = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const decoded: DecodedToken = jwtDecode(token);

          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/wishlist/wishlists/${decoded.username}`
          );
          setWishlists(response.data.data);
          console.log("Wishlists:", response.data.data);
        }
      } catch (error) {
        console.error("Error fetching wishlists:", error);
      }
    };

    fetchWishlists();
  }, []);

  return (
    <div>
      <div className="fixed top-0 z-50 flex w-full h-20 bg-gray-800 text-white items-center justify-between sm:px-40 sm:pr-60 px-4 shadow-2xl">
        <h1 className="font-bold text-2xl">My Wishlist</h1>
      </div>

      <div className="flex bg-gray-100 pt-20 pb-10 p-4">
        <div className="sm:flex flex-col hidden mt-4 bg-white m-1 rounded-lg h-screen w-72 min-w-[18rem] px-3">
          <NewCollectionButton />
          <div className="mt-4 px-4">
            <h2 className="text-lg font-bold mb-2">Collections</h2>
            <ul className="space-y-2">
              <li>
                <h3 className="font-semibold">Public</h3>
                <ul className="ml-4 list-disc">
                  <li className="hover:text-blue-500 cursor-pointer">
                    Shared Wishlist
                  </li>
                  <li className="hover:text-blue-500 cursor-pointer">
                    Trending Items
                  </li>
                </ul>
              </li>
              <li>
                <h3 className="font-semibold">Shared</h3>
                <ul className="ml-4 list-disc">
                  <li className="hover:text-blue-500 cursor-pointer">
                    Family Wishlist
                  </li>
                  <li className="hover:text-blue-500 cursor-pointer">
                    Friends Wishlist
                  </li>
                </ul>
              </li>
              <li>
                <h3 className="font-semibold">Private</h3>
                <ul className="ml-4 list-disc">
                  <li className="hover:text-blue-500 cursor-pointer">
                    Personal Favorites
                  </li>
                  <li className="hover:text-blue-500 cursor-pointer">
                    Secret Wishlist
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex-1 w-full pt-10">
          <div className="sm:hidden flex text-center bg-white mx-4 rounded-lg h-16 px-4 items-center justify-between shadow-md">
            <IoMdMenu
              className="h-8 w-8 cursor-pointer"
              onClick={() => setShowMenu(!showMenu)}
            />
          </div>
          {showMenu && (
            <div className="sm:hidden flex flex-col bg-white mx-4 rounded-lg px-4 py-2 shadow-md mt-1">
              <NewCollectionButton />
              <div className="mt-4 px-4">
                <h2 className="text-lg font-bold mb-2">Collections</h2>
                <ul className="space-y-2">
                  <li>
                    <h3 className="font-semibold">Public</h3>
                    <ul className="ml-4 list-disc">
                      <li className="hover:text-blue-500 cursor-pointer">
                        Shared Wishlist
                      </li>
                      <li className="hover:text-blue-500 cursor-pointer">
                        Trending Items
                      </li>
                    </ul>
                  </li>
                  <li>
                    <h3 className="font-semibold">Shared</h3>
                    <ul className="ml-4 list-disc">
                      <li className="hover:text-blue-500 cursor-pointer">
                        Family Wishlist
                      </li>
                      <li className="hover:text-blue-500 cursor-pointer">
                        Friends Wishlist
                      </li>
                    </ul>
                  </li>
                  <li>
                    <h3 className="font-semibold">Private</h3>
                    <ul className="ml-4 list-disc">
                      <li className="hover:text-blue-500 cursor-pointer">
                        Personal Favorites
                      </li>
                      <li className="hover:text-blue-500 cursor-pointer">
                        Secret Wishlist
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          )}

          <div className="mt-4 px-4 md:px-20 m-2">
            {wishlists.map((wishlist) => (
              <CollectionCard
                key={wishlist.wishlist_id}
                title={wishlist.name}
                createdBy={wishlist.created_by}
                lastUpdated={new Date(wishlist.created_at).toLocaleDateString()}
                wishlist_id={wishlist.wishlist_id}
              />
            ))}
          </div>
        </div>
      </div>

      <div>
        {isEmpty && (
          <>
            <div className="flex flex-col justify-center items-center min-h-screen">
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
          </>
        )}
        <Footer />
      </div>
    </div>
  );
};

export default Page;
