"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ImSpinner8 } from "react-icons/im";
import toast from "react-hot-toast";
import axios from "axios";

export default function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isloading, setIsloading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsloading(true);
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
    } catch (error) {
      toast.error("Login failed. Please try again.");
      console.log(error);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div>
      <header className="flex justify-end px-6">
        <p className="p-5 flex">
          <span className="sm:block hidden">Don&apos;t have an account? </span>
          <button
            className="underline cursor-pointer px-1 hover:no-underline"
            onClick={() => router.push("/signup")}
          >
            Sign Up
          </button>
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
              className={`${
                isloading
                  ? "bg-amber-200 cursor-not-allowed"
                  : "bg-amber-300 hover:bg-amber-400 cursor-pointer"
              } flex h-12 p-2 w-90 rounded-3xl ml-2 font-medium text-white items-center justify-center`}
              disabled={isloading}
            >
              {isloading ? (
                <ImSpinner8 className="animate-spin text-white h-5 w-5" />
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
