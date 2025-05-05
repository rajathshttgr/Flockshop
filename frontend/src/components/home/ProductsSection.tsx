"use client";
import React, { useState, useEffect } from "react";
import Overlay from "../common/Overlay";
import { MdLibraryAdd } from "react-icons/md";
import { BsPeopleFill } from "react-icons/bs";
//import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

// ========== Types ==========
type ProductCardProps = {
  name: string;
  price: string;
  imageUrl?: string;
  productId: string;
  onAddToWishlist: (productId: string) => void;
};

type CollectionCardProps = {
  type: "public" | "private";
  name: string;
  wishlist_id: string;
  selectedWishlistId: string;
  onSelectWishlist: (wishlistId: string) => void;
};

// ========== CollectionCard Component ==========
const CollectionCard: React.FC<CollectionCardProps> = ({
  type,
  name,
  wishlist_id,
  selectedWishlistId,
  onSelectWishlist,
}) => {
  const isSelected = wishlist_id === selectedWishlistId;

  return (
    <div
      className={`flex items-center h-14 w-96 m-1 border-2 rounded-md overflow-hidden shadow-sm transition-shadow duration-300 cursor-pointer ${
        isSelected ? "bg-amber-100 border-amber-400" : "border-gray-200"
      }`}
      onClick={() => onSelectWishlist(wishlist_id)}
    >
      <div className="flex items-center justify-center bg-amber-300 h-full w-14">
        {type === "public" ? (
          <BsPeopleFill className="text-2xl text-white" />
        ) : (
          <FaLock className="text-2xl text-white" />
        )}
      </div>
      <div className="flex-1 px-4 text-gray-800 font-medium h-full flex items-center justify-center">
        {name}
      </div>
    </div>
  );
};

// ========== ProductCard Component ==========
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

type Wishlist = {
  id: number;
  wishlist_id: string;
  name: string;
  is_private: boolean;
};

type Product = {
  id: number;
  product_name: string;
  price: string;
  product_id: string;
  image_url: string;
};

// ========== Main ProductsSection Component ==========
export const ProductsSection: React.FC = () => {
  const [isOverlayOpen, setOverlayOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  const [username, setUsername] = useState<string>("");
  const [selectedWishlistId, setSelectedWishlistId] = useState<string>("");
  const [selectedProductId, setSelectedProductId] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode<{ username: string }>(token);
      setUsername(decoded.username);
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/product/products`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchWishlists = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/wishlist/wishlists/${username}`
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching wishlists:", error);
        return [];
      }
    };

    const loadData = async () => {
      if (!username) return;

      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts.data || []);

      const fetchedWishlists = await fetchWishlists();
      setWishlists(fetchedWishlists.data || []);
    };

    loadData();
  }, [username]);

  const handleSubmit = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/wishlist/products`, {
        wishlist_id: selectedWishlistId,
        product_id: selectedProductId,
        username: username,
      });
      toast.success("Product added to wishlist successfully!");
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
      toast.error("Failed to add product to wishlist.");
    } finally {
      setOverlayOpen(false);
      setSelectedWishlistId("");
    }
  };

  return (
    <div className="sm:px-22 px-4">
      {/* Trending Deals */}
      <div>
        <p className="text-3xl font-bold text-gray-800 mt-6">
          Trending deals of the sale
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:px-10 px-2 p-4">
          {products.slice(0, 8).map((product) => (
            <ProductCard
              key={product.id}
              name={product.product_name}
              price={product.price}
              imageUrl={product.image_url}
              productId={product.product_id}
              onAddToWishlist={(id) => {
                setSelectedProductId(id);
                setOverlayOpen(true);
              }}
            />
          ))}
        </div>
      </div>

      {/* BlockBuster Deals */}
      <div>
        <p className="text-3xl font-bold text-gray-800 mt-6">
          BlockBuster deals
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:px-10 px-2 p-4">
          {products.slice(8, 16).map((product) => (
            <ProductCard
              key={product.id}
              name={product.product_name}
              price={product.price}
              imageUrl={product.image_url}
              productId={product.product_id}
              onAddToWishlist={(id) => {
                setSelectedProductId(id);
                setOverlayOpen(true);
              }}
            />
          ))}
        </div>
      </div>

      {/* Suggested For You */}
      <div>
        <p className="text-3xl font-bold text-gray-800 mt-6">
          Suggested for you
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:px-10 px-2 p-4">
          {products.slice(16, 28).map((product) => (
            <ProductCard
              key={product.id}
              name={product.product_name}
              price={product.price}
              imageUrl={product.image_url}
              productId={product.product_id}
              onAddToWishlist={(id) => {
                setSelectedProductId(id);
                setOverlayOpen(true);
              }}
            />
          ))}
        </div>
      </div>

      {/* Overlay for Wishlist Selection */}
      {isOverlayOpen && (
        <Overlay onClose={() => setOverlayOpen(false)}>
          <div className="w-full">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold text-gray-800">
                Add to Wishlist
              </h1>
              <button
                onClick={() => setOverlayOpen(false)}
                className="text-gray-500 hover:text-gray-800 transition duration-300 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="max-h-64 overflow-y-auto">
              {wishlists.map((wishlist) => (
                <CollectionCard
                  key={wishlist.id}
                  type={wishlist.is_private ? "private" : "public"}
                  name={wishlist.name}
                  wishlist_id={wishlist.wishlist_id}
                  selectedWishlistId={selectedWishlistId}
                  onSelectWishlist={setSelectedWishlistId}
                />
              ))}
            </div>

            <button
              onClick={handleSubmit}
              disabled={!selectedWishlistId}
              className={`w-full mt-4 px-4 py-2 rounded-md transition duration-500 ease-in-out ${
                !selectedWishlistId
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-amber-400 text-white hover:bg-amber-500 cursor-pointer"
              }`}
            >
              Save Changes
            </button>
          </div>
        </Overlay>
      )}
    </div>
  );
};
