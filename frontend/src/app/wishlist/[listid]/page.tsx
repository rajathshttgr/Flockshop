"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";
import Overlay from "@/components/common/Overlay";
import Logincard from "@/components/auth/logincard";
import WishlistHeader from "../../../components/wishlist/WishlistHeader";
import WishlistGrid from "../../../components/wishlist/WishlistGrid";
import { FaShoppingCart } from "react-icons/fa";

const Page = () => {
  const [isOverlayOpen, setOverlayOpen] = useState(false);
  const [isNewUser, setIsNewUser] = useState<boolean | null>(null);
  const [listname, setListname] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [isFollow, setIsFollow] = useState("Follow");

  const router = useRouter();
  const params = useParams();
  const listid = params?.listid as string;

  const sharepage = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "FlockShop Check this out!",
          url: `https://flockshop.vercel.app/wishlist/${listid}`,
        })
        .catch(console.error);
    } else {
      alert("Web Share API not supported");
    }
  };

  useEffect(() => {
    const checkWishlistExists = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/wishlist/wishlists/${listid}`
        );
        if (!res.data.data) router.push("/404");
      } catch {
        router.push("/404");
      }
    };

    checkWishlistExists();
  }, [listid, router]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    let decodedUsername = "";

    if (token) {
      const decoded = jwtDecode<{ username: string }>(token);
      decodedUsername = decoded.username;
    }

    const fetchWishlist = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/list/wishlists/${listid}`
        );
        const data = res.data.data;
        setListname(data.name);
        setCreatedBy(data.created_by);
        setIsNewUser(data.created_by !== decodedUsername);
      } catch (err) {
        console.error(err);
      }
    };

    fetchWishlist();
  }, [listid]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/wishlist/products/${listid}`
        );
        setWishlistProducts(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, [listid]);

  return (
    <div>
      <Header />
      <WishlistHeader
        listname={listname}
        listid={listid}
        createdBy={createdBy}
        isNewUser={isNewUser}
        isFollow={isFollow}
        totalProducts={wishlistProducts.length}
        onFollowClick={() => setOverlayOpen(true)}
        onShareClick={sharepage}
      />
      <WishlistGrid products={wishlistProducts} listid={listid} />

      <div className="flex justify-center items-center mt-12 mb-20">
        <button
          onClick={() => router.push("/")}
          className="cursor-pointer w-80 flex items-center justify-center bg-gradient-to-r from-amber-400 to-yellow-500 text-white font-semibold text-lg px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:from-amber-500 hover:to-yellow-600 transition transform hover:scale-105"
        >
          <FaShoppingCart className="mr-2 text-xl" />
          Browse More
        </button>
      </div>

      <Footer />

      {isOverlayOpen && (
        <Overlay onClose={() => setOverlayOpen(false)}>
          <Logincard
            wishlistId={listid}
            setOverlayOpen={setOverlayOpen}
            setIsFollow={setIsFollow}
          />
        </Overlay>
      )}
    </div>
  );
};

export default Page;
