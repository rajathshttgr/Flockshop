"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

export default function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
        router.push("/");
        toast.success("Login successful!");
      } else {
        toast.error("Login failed: No token returned.");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <header className="flex justify-end px-6">
        <p className="p-5 flex">
          <span className="sm:block hidden">Don&apos;t have an account? </span>
          <span
            className="underline cursor-pointer pl-1 hover:no-underline"
            onClick={() => router.push("/signup")}
          >
            Sign Up
          </span>
        </p>
      </header>
      <div className="flex justify-center items-center pb-16">
        <div className="w-[380px] text-2xl text-center font-bold mt-12">
          <div className="mb-6">Welcome back</div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="w-90 h-12 bg-gray-200 m-3 p-4 rounded-md text-black font-light text-sm"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              className="w-90 h-12 bg-gray-200 m-3 p-4 rounded-md text-black font-light text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-amber-300 w-90 h-12 rounded-3xl m-2 mt-6 shadow font-medium text-white cursor-pointer hover:bg-amber-400"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
