import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";

export const Footer = () => {
  return (
    <div className="flex flex-col border-t-2 p-6 sm:px-16 px-4 border-gray-300 w-full bg-gray-800 text-white justify-center">
      <div className="flex flex-col md:flex-row justify-between items-center w-full">
        <div>
          <div className="text-sm text-gray-400 font-extralight">
            Join our newsletter to get the latest updates and offers.
          </div>
          <div className="flex">
            <form action="">
              <input
                type="email"
                placeholder="Enter your email"
                className="my-4 w-60 md:w-80 h-10 border rounded-md bg-transparent p-4 border-white"
              />
              <button
                type="submit"
                className="h-10 w-24 ml-1 bg-white text-black rounded-md shadow-md"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="flex space-x-3 mt-4 md:mt-0">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-2xl"
          >
            <FaFacebookSquare />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-2xl"
          >
            <FaSquareXTwitter />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-2xl"
          >
            <FaInstagramSquare />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-2xl"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mt-4">
        <div className="text-sm text-gray-400 font-extralight pt-4 items-center text-center">
          The assets, images, and content utilized in this project may include
          copyrighted materials. This project is intended solely for educational
          purposes and is not for commercial use.
        </div>
        <div className="text-sm text-gray-400">
          © 2025 Rajath Shettigar. All rights reserved.
        </div>
      </div>
      <div className="text-right">version 1.0.1</div>
    </div>
  );
};
