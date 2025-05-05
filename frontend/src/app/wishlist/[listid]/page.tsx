"use client";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaRegHeart, FaShoppingCart } from "react-icons/fa";
import Overlay from "@/components/common/Overlay";
import { Header } from "../../../components/layouts/Header";
import { Footer } from "../../../components/layouts/Footer";
import { useRouter, useParams } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import Logincard from "@/components/auth/logincard";

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
  const [username, setUsername] = useState<string>("");

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
      console.error("Error removing product:", error);
      toast.error("Failed to remove product from wishlist.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-between h-full p-4 bg-gray-200 rounded-md">
      <div className="w-full h-36 bg-gray-50 rounded-md">
        {image_url ? (
          <Image
            src={image_url}
            alt={name}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
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
        className="flex items-center justify-center mt-auto bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition duration-500 ease-in-out cursor-pointer"
      >
        <MdDelete className="mr-2" />
        Remove from Wishlist
      </button>
      <div className="mt-2 text-sm text-gray-500">
        <span className="text-gray-600">
          Added by{" "}
          <span className={`font-bold text-gray-800`}>
            {added_by === username ? "you" : added_by}
          </span>
        </span>
      </div>
    </div>
  );
};

const Page = () => {
  const [isOverlayOpen, setOverlayOpen] = useState(false);
  const [isNewUser, setIsNewUser] = useState<boolean | null>(null);
  const [listname, setListname] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  type WishlistProduct = {
    id: string;
    product_name: string;
    price: number;
    image_url?: string;
    product_id?: string;
    added_by?: string;
  };

  const [wishlistProducts, setWishlistProducts] = useState<WishlistProduct[]>(
    []
  );
  const router = useRouter();
  const params = useParams();
  const [isFollow, setIsFollow] = useState("Follow");
  const listid = params?.listid as string;

  const sharepage = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `FlockShop Check this out!`,
          url: `http://localhost:3000/wishlist/${listid}`,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Error sharing", error));
    } else {
      alert("Your browser doesn't support the Web Share API.");
    }
  };

  useEffect(() => {
    const checkWishlistExists = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/wishlist/wishlists/${listid}`
        );
        if (!response.data.data) router.push("/404");
      } catch (error) {
        console.log(error);
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

    const fetchWishlistData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/list/wishlists/${listid}`
        );
        const data = response.data.data;

        console.log("Fetched data:", data);
        setListname(data.name);
        setCreatedBy(data.created_by);
        setIsNewUser(data.created_by !== decodedUsername);
      } catch (error) {
        console.error("Error fetching wishlist data:", error);
      }
    };

    fetchWishlistData();
  }, [listid]);

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/wishlist/products/${listid}`
        );
        setWishlistProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching wishlist products:", error);
      }
    };

    fetchWishlistProducts();
  }, [listid]);

  return (
    <div>
      <Header />
      <div className="pt-24">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          {listname}
        </h1>
        <p className="text-center text-gray-600">
          Wishlist ID: <span className="font-mono text-gray-800">{listid}</span>
        </p>

        <div className="flex justify-between border-b-2 border-gray-300 mt-4 mb-6 m-4">
          {isNewUser === null ? (
            <div></div>
          ) : isNewUser ? (
            <button
              className="ml-2 m-1 px-4 cursor-pointer py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              onClick={() => setOverlayOpen(true)}
            >
              {isFollow}
            </button>
          ) : (
            <div className="flex gap-4">
              <button
                className="px-4 cursor-pointer py-2 m-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                onClick={sharepage}
              >
                Share
              </button>
              <button className="px-4 py-2 m-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition">
                Edit
              </button>
            </div>
          )}
          <div className="flex gap-4 items-center">
            <p className="text-gray-600">
              Total Products:{" "}
              <span className="font-bold text-gray-800">
                {wishlistProducts.length}
              </span>
            </p>
            <p className="text-gray-600">
              Created by:{" "}
              <span className="font-bold text-gray-800">
                {`${createdBy}${isNewUser === false ? " (you)" : ""}`}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:px-10 px-2 p-4">
        {wishlistProducts.map((product) => (
          <ProductCard
            key={product.id}
            name={product.product_name}
            price={`₹${product.price}/-`}
            image_url={product.image_url}
            product_id={product.product_id}
            added_by={product.added_by}
            listid={listid}
          />
        ))}
      </div>

      <div className="flex justify-center items-center mt-12 mb-20">
        <button
          onClick={() => router.push("/")}
          className="w-80 cursor-pointer flex items-center justify-center bg-gradient-to-r from-amber-400 to-yellow-500 text-white font-semibold text-lg px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:from-amber-500 hover:to-yellow-600 transition duration-300 ease-in-out transform hover:scale-105"
        >
          <FaShoppingCart className="mr-2 text-xl" />
          Browse More
        </button>
      </div>

      <Footer />

      {/* Overlay for Wishlist Selection */}
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
