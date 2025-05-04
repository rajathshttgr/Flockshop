// components/Overlay.tsx
import React, { useEffect } from "react";

type OverlayProps = {
  onClose: () => void;
  children: React.ReactNode;
};

const Overlay: React.FC<OverlayProps> = ({ onClose, children }) => {
  // Prevent scrolling when overlay is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black/10 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded shadow-lg z-60"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Overlay;
