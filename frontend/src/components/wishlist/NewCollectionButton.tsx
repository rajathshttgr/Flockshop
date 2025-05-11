"use client";
import { useState } from "react";
import Overlay from "@/components/common/Overlay";
import { MdLibraryAdd } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

export const NewCollectionButton = () => {
  const [isOverlayOpen, setOverlayOpen] = useState(false);
  const [collectionName, setCollectionName] = useState("");
  const shareOptions = [
    {
      value: "private",
      label: "Private",
      desc: "Only you can view",
    },
    {
      value: "public",
      label: "Public",
      desc: "Anyone can search for and view",
    },
  ] as const;

  type ShareSetting = (typeof shareOptions)[number]["value"];

  const [shareSetting, setShareSetting] = useState<ShareSetting>("private");

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }
    const decoded = jwtDecode<{ username: string }>(token);
    const createdBy = decoded.username;

    if (!createdBy) {
      console.error("Invalid token: username not found");
      return;
    }

    const requestBody = {
      name: collectionName,
      created_by: createdBy,
      is_private: shareSetting,
    };

    if (!collectionName.trim()) return;

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/wishlist/wishlists`,
        requestBody
      );
      toast.success("Collection created successfully");
      setOverlayOpen(false); // Close overlay after successful submission
      window.location.reload();
    } catch (error) {
      console.error("Error creating collection:", error);
    }
  };

  const suggestions = [
    "My Birthday Wishlist",
    "Clothing Must Haves",
    "My Favorites",
  ];

  return (
    <div>
      <button
        className="flex items-center bg-amber-400 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-amber-500 cursor-pointer transition duration-300 mt-4"
        onClick={() => setOverlayOpen(true)}
      >
        <MdLibraryAdd className="mr-2 text-xl" />
        Create a New Collection
      </button>

      {isOverlayOpen && (
        <Overlay onClose={() => setOverlayOpen(false)}>
          <form
            onSubmit={handleCreate}
            className="bg-white rounded-xl w-full max-w-md p-6 space-y-6"
          >
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-gray-800">
                Create a new collection
              </h1>
            </div>

            <div>
              <label className="block text-sm mb-1">Collection name*</label>
              <input
                type="text"
                value={collectionName}
                onChange={(e) => setCollectionName(e.target.value)}
                placeholder="Enter name"
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Suggestions</label>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((text) => (
                  <button
                    type="button"
                    key={text}
                    onClick={() => setCollectionName(text)}
                    className="px-3 py-1 border border-gray-300 rounded-full text-sm hover:bg-gray-100"
                  >
                    {text}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Share settings
              </label>
              <div className="space-y-2">
                {shareOptions.map(({ value, label, desc }) => (
                  <label key={value} className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="shareSetting"
                      value={value}
                      checked={shareSetting === value}
                      onChange={(e) =>
                        setShareSetting(e.target.value as ShareSetting)
                      }
                    />
                    <div>
                      <div className="font-medium">{label}</div>
                      <div className="text-sm text-gray-500">{desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={!collectionName.trim()}
              className={`w-full py-2 rounded-md text-white hover:bg-gray-900 cursor-pointer ${
                collectionName.trim()
                  ? "bg-black"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Create collection
            </button>
          </form>
        </Overlay>
      )}
    </div>
  );
};
