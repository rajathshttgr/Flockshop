"use client";
import React, { useState, useEffect } from "react";
import Overlay from "../common/Overlay";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import ProductCard from "../products/ProductCard";
import WishlistCard from "../products/WishlistCard";
import { useRouter } from "next/navigation";

type Wishlist = {
  id: number;
  wishlist_id: string;
  name: string;
  is_private: string;
};

type Product = {
  id: number;
  product_name: string;
  price: string;
  product_id: string;
  image_url: string;
};

export const ProductsSection: React.FC = () => {
  const [isOverlayOpen, setOverlayOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  const [username, setUsername] = useState<string>("");
  const [selectedWishlistId, setSelectedWishlistId] = useState<string>("");
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode<{ username: string }>(token);
      setUsername(decoded.username);
    }
  }, []);

  useEffect(() => {
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

  const renderProducts = (start: number, end: number) =>
    products.slice(start, end).map((product) => (
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
    ));

  return (
    <div className="sm:px-22 px-4">
      <div>
        <p className="text-3xl font-bold text-gray-800 mt-6">
          Trending deals of the sale
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:px-10 px-2 p-4">
          {renderProducts(0, 8)}
        </div>
      </div>

      <div>
        <p className="text-3xl font-bold text-gray-800 mt-6">
          BlockBuster deals
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:px-10 px-2 p-4">
          {renderProducts(8, 16)}
        </div>
      </div>

      <div>
        <p className="text-3xl font-bold text-gray-800 mt-6">
          Suggested for you
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:px-10 px-2 p-4">
          {renderProducts(16, 28)}
        </div>
      </div>

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
              {wishlists.length > 0 ? (
                wishlists.map((wishlist) => (
                  <WishlistCard
                    key={wishlist.id}
                    type={wishlist.is_private}
                    name={wishlist.name}
                    wishlist_id={wishlist.wishlist_id}
                    selectedWishlistId={selectedWishlistId}
                    onSelectWishlist={setSelectedWishlistId}
                  />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center text-gray-500">
                  <p className="mb-4">No wishlists found.</p>
                  <button
                    onClick={() => router.push("/wishlist")}
                    className="px-4 py-2 bg-amber-400 text-white rounded-md hover:bg-amber-500 transition cursor-pointer"
                  >
                    Create a New Wishlist
                  </button>
                </div>
              )}
            </div>

            {wishlists.length > 0 && (
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
            )}
          </div>
        </Overlay>
      )}
    </div>
  );
};
