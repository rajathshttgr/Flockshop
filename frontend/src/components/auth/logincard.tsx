"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface LogincardProps {
  wishlistId?: string;
  setOverlayOpen: (value: boolean) => void;
  setIsFollow: (value: string) => void;
}

export default function Logincard({
  wishlistId,
  setOverlayOpen,
  setIsFollow,
}: LogincardProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [wishlistid, setWishlistid] = useState<string | undefined>(wishlistId);
  const router = useRouter();

  useEffect(() => {
    if (wishlistId) {
      setWishlistid(wishlistId);
    }
  }, [wishlistId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        { username, password }
      );
      const { token } = response.data.data;

      if (token) {
        localStorage.setItem("token", token);
        const decodedToken = jwtDecode<{ username: string }>(token);
        const userId = decodedToken?.username;

        await axios.post("http://localhost:4000/api/wishlist/follower", {
          wishlist_id: wishlistid,
          user_id: userId,
        });

        setIsFollow("Following"); // Update follow status
        setOverlayOpen(false); // Close the overlay
        toast.success("Login successful!");
      } else {
        toast.error("Login failed: No token returned.");
      }
    } catch (error: unknown) {
      toast.error(error?.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-[400px]">
        <header className="text-center mb-6">
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <span
              className="text-amber-500 underline cursor-pointer hover:no-underline"
              onClick={() => router.push("/signup")}
            >
              Sign Up
            </span>
          </p>
        </header>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              className="w-full h-12 bg-gray-100 border border-gray-300 rounded-md px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              className="w-full h-12 bg-gray-100 border border-gray-300 rounded-md px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full h-12 bg-amber-400 text-white rounded-md font-medium hover:bg-amber-500 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
