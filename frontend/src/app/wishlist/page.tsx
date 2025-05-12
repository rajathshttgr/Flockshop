"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import { Footer } from "@/components/layouts/Footer";
import { NewCollectionButton } from "@/components/wishlist/NewCollectionButton";
import { CollectionCard } from "@/components/wishlist/CollectionCard";
import { IoMdMenu } from "react-icons/io";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { EmptyWishlist } from "@/components/wishlist/EmptyWishlist";
import { useRouter } from "next/navigation";

const Page = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  const [username, setUsername] = useState("");
  const router = useRouter();

  interface DecodedToken {
    username: string;
  }

  interface Wishlist {
    wishlist_id: string;
    name: string;
    created_by: string;
    created_at: string;
  }

  const [wishlists, setWishlists] = useState<Wishlist[]>([]);

  useEffect(() => {
    const fetchWishlists = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const decoded: DecodedToken = jwtDecode(token);
          setUsername(decoded.username);

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

  useEffect(() => {
    setIsEmpty(wishlists.length === 0);
  }, [wishlists]);

  return (
    <div>
      <div className="fixed top-0 z-50 flex w-full h-20 bg-gray-800 text-white items-center justify-between sm:px-40 sm:pr-60 px-4 shadow-2xl">
        <h1 className="font-bold text-2xl">My Wishlist</h1>
      </div>

      <div className="flex bg-gray-100 pt-20 pb-10 p-4">
        <div className="sm:flex flex-col hidden mt-4 bg-white m-1 rounded-lg h-screen w-72 min-w-[18rem] px-3">
          <NewCollectionButton />
          <div className="mt-2 p-1">
            {wishlists.map((wishlist) => (
              <div
                key={wishlist.wishlist_id}
                onClick={() => router.push(`/wishlist/${wishlist.wishlist_id}`)}
                className="w-full p-2 my-2 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:bg-amber-100 transition-all duration-200 cursor-pointer"
              >
                <h3 className="text-lg font-medium text-gray-800 truncate">
                  {wishlist.name}
                </h3>
              </div>
            ))}
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
            <div className="sm:hidden flex flex-col bg-white mx-4 rounded-lg px-4 py-2 shadow-md mt-1 ">
              <NewCollectionButton />
              <div className="mt-2 p-1">
                {wishlists.map((wishlist) => (
                  <div
                    className="my-2 p-1 w-full bg-gray-200 cursor-pointer rounded-md hover:bg-amber-200"
                    key={wishlist.wishlist_id}
                    onClick={() => {
                      router.push(`/wishlist/${wishlist.wishlist_id}`);
                    }}
                  >
                    {wishlist.name}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-4 px-4 md:px-20 m-2">
            {wishlists.map((wishlist) => (
              <CollectionCard
                key={wishlist.wishlist_id}
                title={wishlist.name}
                createdBy={
                  wishlist.created_by === username
                    ? `${wishlist.created_by} (you)`
                    : wishlist.created_by
                }
                lastUpdated={new Date(wishlist.created_at).toLocaleDateString()}
                wishlist_id={wishlist.wishlist_id}
              />
            ))}
          </div>
          {isEmpty && <EmptyWishlist />}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Page;
